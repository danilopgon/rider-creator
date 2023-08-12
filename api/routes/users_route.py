from utils.db import db
from flask import Blueprint


from controllers.user_controller import find_users_by_name

users_routes = Blueprint("users_routes", __name__)

@users_routes.route("/<user_name>", methods=["GET"])
def get_user_by_user_name(user_name):
    return find_users_by_name(user_name)
