import datetime
import uuid

from flask import request, jsonify
from models import User, Provisional_token
from utils import db, bcrypt
from flask_jwt_extended import (
    create_access_token,
    get_jwt_identity,
    verify_jwt_in_request,
)
from templates_email.activation_account import msg_activation
from services.send_mail import send_mail


def set_register():
    try:
        email = request.json.get("email", None)
        username = request.json.get("username", None)
        password = request.json.get("password", None)

        if not username:
            return jsonify({"message": "Missing username"}), 400

        if not email:
            return jsonify({"message": "Missing email"}), 400

        if not password:
            return jsonify({"message": "Missing password"}), 400

        if User.query.filter_by(email=email).first():
            return jsonify({"message": "Email already exists"}), 400

        if User.query.filter_by(username=username).first():
            return jsonify({"message": "Username already exists"}), 400

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
        hash_token = uuid.uuid4().hex
        token.token = hash_token
        token.token_exp = datetime.datetime.now() + datetime.timedelta(minutes=15)
        db.session.add(token)
        db.session.commit()

        html_activation = msg_activation(hash_token, user.username)

        send_mail(
            "Activación de tu cuenta",  # subject
            "riderapp22@gmail.com",  # from
            user.email,
            "Por favor active su cuenta",  # text_body
            html_activation,  # html_body
        )

        return jsonify({"message": "User created successfully"}), 201
    except Exception as error:
        print(error)
        return jsonify({"message": "Internal server error"}), 500


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


def set_active(token):
    find_token = Provisional_token.query.filter_by(token=token).first()
    if find_token:
        if find_token.expiration_date < datetime.datetime.now():
            Provisional_token.query.filter_by(token=token).delete()
            return jsonify({"message": "Token expired"}), 403
        user_id = find_token.user_id
        find_user = User.query.filter_by(id=user_id).first()
        if find_user:
            find_user.active = True
            db.session.commit()
            Provisional_token.query.filter_by(token=token).delete()
            db.session.commit()
            return jsonify({"message": "User activated"}), 200
    return jsonify({"message": "Invalid token"}), 404


def validate_token():
    try:
        response = verify_jwt_in_request()
        current_user = get_jwt_identity()

        if not response:
            return {"message": "Invalid token"}, 401

        return {"message": "Token is valid", "user": current_user}, 200

    except Exception as e:
        return {"message": "An error occurred while validating the token"}, 500
