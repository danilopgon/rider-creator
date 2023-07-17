"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, send_from_directory, Blueprint
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_mail import Mail
from flask_cors import CORS

# modulos
from utils.db import db

from utils.crypt import bcrypt
from routes.api import api

app = Flask(__name__)

static_file_dir = os.path.join(
    os.path.dirname(os.path.realpath(__file__)), "..", "app", "dist"
)

mail = Mail(app)
# init mail app
mail.init_app(app)

# Setup the Flask-JWT-Extended extension
app.config["JWT_SECRET_KEY"] = "super-secret"
jwt = JWTManager(app)

# configure the SQLite database, relative to the app instance folder
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///project.db"

# migrate the database
migrate = Migrate(app, db)
CORS(app)


# initialize the app with the extension
db.init_app(app)
# create tables
with app.app_context():
    db.create_all()

app.register_blueprint(api, url_prefix="/api")


@app.route("/")
@app.route("/<path:path>", methods=["GET"])
def serve_any_other_file(path="index.html"):
    response = send_from_directory(static_file_dir, path)
    return response


if __name__ == "__main__":
    PORT = int(os.environ.get("PORT", 3000))
    app.run(host="0.0.0.0", port=PORT, debug=True)
