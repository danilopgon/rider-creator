from controllers.user_auth_controller import (
    set_register,
    set_login,
    set_active,
    validate_token,
)
from flask import Flask, request, Blueprint, jsonify
from flask_bcrypt import Bcrypt


user_auth = Blueprint("user_auth", __name__)


@user_auth.route("/register", methods=["POST"])
def user_register():
    return set_register()


@user_auth.route("/login", methods=["POST"])
def user_login():
    return set_login()


@user_auth.route("/active/<token>", methods=["GET"])
def user_active(token):
    set_active(token)
    return "Cuenta activada"


@user_auth.route("/validate-token", methods=["GET"])
def validate_route():
    return validate_token()
