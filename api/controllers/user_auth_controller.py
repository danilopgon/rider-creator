from flask import Flask, request, jsonify
from models.users import User
from models.token_provisional import Provisional_token
from utils.db import db
from utils.crypt import bcrypt
import datetime
from flask_jwt_extended import create_access_token
from services.send_mail import send_mail

app = Flask(__name__)


@app.route("/register", methods=["POST"])
def set_register():
    data = request.json
    if not data:
        return jsonify({"message": "Missing data"}), 400

    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if not (username and email and password):
        return jsonify({"message": "Invalid data"}), 400

    if (
        User.query.filter_by(email=email).first()
        or User.query.filter_by(username=username).first()
    ):
        return jsonify({"message": "User already exists"}), 400

    user = User()
    user.username = username
    user.email = email
    password_hash = bcrypt.generate_password_hash(password)
    user.password = password_hash
    user.active = False
    db.session.add(user)
    db.session.commit()

    token = Provisional_token()
    token.user_id = user.id
    hash_token = create_access_token(identity=user.id)
    token.token = hash_token
    token.expiration_date = datetime.datetime.now() + datetime.timedelta(minutes=15)
    db.session.add(token)
    db.session.commit()

    send_mail(
        "activacion",
        "from_email@activacion",
        "to_email@activacion",
        "Por favor active su cuenta",
        "activacion.html",
    )

    return jsonify({"message": "User created successfully"}), 201


@app.route("/login", methods=["POST"])
def set_login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    find_user = User.query.filter_by(email=email).first()
    if find_user:
        if bcrypt.check_password_hash(find_user.password, password):
            access_token = create_access_token(identity=find_user.id)
            return jsonify({"message": "Login successful", "token": access_token}), 200
        else:
            return jsonify({"message": "Invalid password"}), 400
    else:
        return jsonify({"message": "User not found"}), 404


@app.route("/activate/<token>", methods=["POST"])
def set_active(token):
    find_token = Provisional_token.query.filter_by(token=token).first()
    if find_token:
        if find_token.expiration_date < datetime.datetime.now():
            return jsonify({"message": "Token expired"}), 400
        user_id = find_token.user_id
        find_user = User.query.filter_by(id=user_id).first()
        if find_user:
            find_user.active = True
            db.session.commit()
            Provisional_token.query.filter_by(token=token).delete()
            db.session.commit()
            return jsonify({"message": "User activated"}), 200
    return jsonify({"message": "Invalid token"}), 404
