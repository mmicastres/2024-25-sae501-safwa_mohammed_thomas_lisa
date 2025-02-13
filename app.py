from flask import *
from flask_login import *
from flask_cors import *
from flask_sqlalchemy import *
from flask_jwt_extended import *
from flask_migrate import *
from datetime import timedelta
from werkzeug.security import *
import pymysql

pymysql.install_as_MySQLdb()


app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://python:python123@127.0.0.1:3306/python'
app.config['SECRET_KEY'] = '8d68734af100472db4d0'
app.config["JWT_SECRET_KEY"] = '9jduzui!çéyvjhzhj'
app.config['JWT_TOKEN_LOCATION'] = ['headers']
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=30)

db = SQLAlchemy(app)
jwt = JWTManager(app)
migrate = Migrate(app, db)
login_manager = LoginManager()
login_manager.init_app(app)

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False)
    points = db.Column(db.Integer, nullable=False, default=0)
    password = db.Column(db.String(240), nullable=False)
    plants = db.relationship('Plant', backref='owner', lazy=True)
    powerups = db.relationship('Powerup', backref='owner', lazy=True)
    inventory = db.relationship('Inventory', backref='owner', lazy=True)

    def __str__(self):
        return super().__str__()

class Plant(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    name = db.Column(db.String(80), nullable=False)
    hp = db.Column(db.Integer, nullable=False)
    state = db.Column(db.Integer, nullable=False)
    image = db.Column(db.String(80), nullable=False)

class Powerup(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    power = db.Column(db.Integer, nullable=False)

class Shop(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    item_name = db.Column(db.String(80), nullable=False)
    item_type = db.Column(db.String(50), nullable=False) 
    price = db.Column(db.Integer, nullable=False)

class Inventory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    item_id = db.Column(db.Integer, nullable=False)  
    item_type = db.Column(db.String(50), nullable=False) 
    quantity = db.Column(db.Integer, nullable=False, default=1)

with app.app_context():
    db.create_all()

@login_manager.user_loader
def get(user_id):
    return User.query.get(int(user_id))


@app.route('/register', methods=['POST'])
def register_route():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    exists = User.query.filter_by(username=username).first()

    if exists:
        return jsonify({'error':'User already registered.'}), 400
    
    if len(password) < 8:
        return jsonify({'error':'Password must have at least 8 characters.'}), 400
    
    if username == password:
        return jsonify({'error':'Username and password cannot be same.'}), 400
    
    new_user = User(
        username = username,
        password = generate_password_hash(password),
        points = 0
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message':'User registered successfully.'}), 201


@app.route('/signin', methods=['POST'])
def login_user_route():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    exists = User.query.filter_by(username=username).first()
    
    if not exists:
        return jsonify({'error':'User not found.'}), 404

    if exists and check_password_hash(exists.password, password):
        access_token = create_access_token(identity=exists.id, fresh=True)
        refresh_token = create_refresh_token(identity=exists.id)
        return jsonify({'access_token':access_token, 'refresh_token':refresh_token}), 200
    
    else:
        return jsonify({'error':'Invalid credentials.'}), 401

@app.route('/refresh_token', methods=['POST'])
@jwt_required(refresh=True)
def create_refresh():
    user = get_jwt_identity()
    new_token = create_access_token(identity=user, fresh=False)
    return jsonify({'access_token':new_token}), 200

@app.route('/test', methods=['GET'])
@jwt_required()
def test_route():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    print(user)
    return jsonify({'username':user.username, 
                    "points":user.points,
                    'plants':[plant.name for plant in user.plants],
                    'powerups':[powerup.power for powerup in user.powerups],
                    'inventory':[inventory.item_type for inventory in user.inventory]}), 200

@app.route('/test-users', methods=['GET'])
@jwt_required()
def test_users_route():
    users = User.query.all()
    print(users)
    senatized = []
    for user in users:
        print(user)
        print(user.username)
        senatized.append({
            'id':user.id,
            'username':user.username,
            'points':user.points,
            'plants':[plant.name for plant in user.plants],
            'powerups':[powerup.power for powerup in user.powerups],
            'inventory':[inventory.item_type for inventory in user.inventory]
        })
    return jsonify({"users":senatized}), 200


@app.route('/test-shop', methods=['GET'])
@jwt_required()
def test_shop_route():
    shop_items = Shop.query.all()
    sen = []
    for item in shop_items:
        sen.append({
            'id':item.id,
            'item_name':item.item_name,
            'item_type':item.item_type,
            'price':item.price
        })
    return jsonify({'shop_items':sen}), 200

@app.route('/test-buy', methods=['POST'])
@jwt_required()
def test_buy():
    data = request.get_json()
    item_id = data.get('item_id')
    user = User.query.get(get_jwt_identity())
    item = Shop.query.get(item_id)

    if not item:
        return jsonify({'error':'Item not found.'})

    if user.points < item.price:
        return jsonify({'error':"You don't have enough points."})
    
    search_item = Inventory.query.filter_by(user_id=get_jwt_identity(), item_id=item.id).first()

    if search_item:
        search_item.quantity += 1

    else:
        new_item = Inventory(
            user_id=get_jwt_identity(),
            item_id=item.id,
            item_type=item.item_type,
            quantity=1
        )    
        db.session.add(new_item)

    user.points = user.points - item.price
    db.session.commit()
    return jsonify({'success':'Item bought successfully!'})

@app.route("/models/<name>")
def send_model(name):
    return send_from_directory('static/3d', name)

@app.route("/textures/<name>")
def send_texture(name):
    return send_from_directory('static/img', name)

@app.route("/image/<name>")
def send_image(name):
    return send_from_directory('static/image', name)


if __name__ == '__main__':
    app.run(port=8095, debug=True, host='0.0.0.0')