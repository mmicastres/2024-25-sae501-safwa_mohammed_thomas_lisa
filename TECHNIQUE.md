# Documentation Technique - Plantopia

Ce document décrit le minimum nécessaire pour installer et lancer l'application Plantopia.
Le dépôt se trouve ici : 
https://github.com/mmicastres/2024-25-sae501-safwa_mohammed_thomas_lisa.git

---

## Backend

**Technologies utilisées :**
- Python Flask
- MySQL

**Installation et lancement :**

1. Cloner le dépôt :

   ```bash
   git clone https://github.com/mmicastres/2024-25-sae501-safwa_mohammed_thomas_lisa.git
   ```

3. Créer et activer un environnement virtuel (optionnel mais recommandé) :

   - Sur Linux/Mac :
     
     ```bash
     python -m venv venv
     ```
     
     ```bash
     source venv/bin/activate
     ```
   
   - Sur Windows :
     
     ```powersell
     python -m venv venv
     ```
     
     ```powershell
     venv\Scripts\activate
     ```

4. Installer les dépendances :

   ```python
   pip install Flask Flask-Login Flask-Cors Flask-SQLAlchemy Flask-JWT-Extended Flask-Migrate pymysql Werkzeug
   ```

6. Configurer la base de données :

   - Créez une base de données MySQL.
   - Dans le fichier de configuration de l'application, modifiez la chaîne de connexion suivante en fonction de votre configuration :

     ```python
     app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://python:python123@127.0.0.1:3306/python'
     ```

7. Lancer le serveur Flask :

   ```python
   python app.py
   ```

---

## Frontend

**Technologies utilisées :**
- Vue.js avec Ionic

**Installation et lancement :**

1. Installer les dépendances Node :

   ```bash
   npm install
   ```

2. Lancer l'application en mode développement :

   ```bash
   ionic serve
   ```

4. Vérifiez que l’application front-end est bien configurée pour se connecter au backend (par défaut sur http://localhost:8095).

---

## Récapitulatif

- Cloner le dépôt :

  ```bash
  git clone https://github.com/mmicastres/2024-25-sae501-safwa_mohammed_thomas_lisa.git
  ```

- **Backend :**
  - Créer un environnement virtuel et installer les dépendances via pip.
  - Modifier la chaîne de connexion MySQL dans le fichier Flask (SQLALCHEMY_DATABASE_URI).
  - Lancer le backend avec ``python app.py``.
  
- **Frontend :**
  - Installer les dépendances Node avec ``npm install``.
  - Lancer le frontend avec ``ionic serve``.
