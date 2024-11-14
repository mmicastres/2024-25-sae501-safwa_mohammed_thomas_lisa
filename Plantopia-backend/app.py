from flask import *
from flask_login import *
from flask_cors import *
from flask_sqlalchemy import *
from flask_jwt_extended import *
from flask_migrate import *
from datetime import timedelta
from werkzeug.security import *


app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
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
    data = request.get_json()
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


@app.route('/login', methods=['POST'])
def login_route():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    exists = User.query.filter_by(username=username).first()
    
    if not exists:
        return jsonify({'error':'User not found.'}), 404

    if exists and check_password_hash(exists.password, password):
        access_token = create_access_token(identity=exists.id)
        refresh_token = create_refresh_token(identity=exists.id)
        return jsonify({'access_token':access_token, 'refresh_token':refresh_token}), 200
    
    else:
        return jsonify({'error':'Invalid credentials.'}), 401

@app.route('/refresh_token', methods=['POST'])
@jwt_required(refresh=True)
def create_refresh_token():
    user = get_jwt_identity()
    new_token = create_access_token(identity=user, fresh=False)
    return jsonify({'access_token':new_token}), 200


@app.route('/test', methods=['GET'])
@jwt_required()
def test_route():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    return jsonify({'user':user}), 200


if __name__ == '__main__':
    app.run(port=8093, debug=True, host='0.0.0.0')