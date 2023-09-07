"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from dotenv import load_dotenv

load_dotenv()

import os
from flask import Flask, send_from_directory, Blueprint
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_mail import Message
from utils.mail import mail
from controllers.chat_controller import socketio

import cloudinary



# modulos
from utils import db, mail
from routes.api import api

app = Flask(__name__)

static_file_dir = os.path.join(
    os.path.dirname(os.path.realpath(__file__)), "..", "app", "dist"
)

# init mail app
app.config["MAIL_SERVER"] = os.getenv("MAIL_SERVER")
app.config["MAIL_PORT"] = int(os.getenv("MAIL_PORT"))
app.config["MAIL_USERNAME"] = os.getenv("MAIL_USERNAME")
app.config["MAIL_PASSWORD"] = os.getenv("MAIL_PASSWORD")
app.config["MAIL_USE_TLS"] = os.getenv("MAIL_USE_TLS") == "True"
app.config["MAIL_USE_SSL"] = os.getenv("MAIL_USE_SSL") == "True"

mail.init_app(app)

# Setup the Flask-JWT-Extended extension
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
jwt = JWTManager(app)

# configure the SQLite database, relative to the app instance folder
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("SQLALCHEMY_DATABASE_URI")

#configure cloudinary
cloudinary.config( 
  cloud_name = os.getenv("ClOUD_NAME"), 
  api_key = os.getenv("API_KEY_CLOUDINARY"), 
  api_secret = os.getenv("API_SECRET_CLOUDINARY")
)

#socketio = SocketIO(app)
socketio.init_app(app, cors_allowed_origins='*')

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
    path = path if os.path.isfile(os.path.join(static_file_dir, path)) else "index.html"
    response = send_from_directory(static_file_dir, path)
    return response


# if __name__ == "__main__":
#     PORT = int(os.environ.get("PORT", 3000))
#     app.run(host="0.0.0.0", port=PORT, debug=True)
if __name__ == '__main__':
    socketio.run(app)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)

