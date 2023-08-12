from flask import Blueprint, request, jsonify
from utils.db import db
from flask_jwt_extended import jwt_required, get_jwt_identity
from .controllers.images_controller import upload_img_user_profile, get_img_user_profile, update_img_user_profile, delete_img_user_profile

images_routes = Blueprint("images_routes", __name__)

@images_routes.route("/upload/user-profile", methods=["POST", "GET", "PUT", "DELETE"])
@jwt_required()
def upload_image_user_profile():
    current_user = get_jwt_identity()
    if request.method == "POST":
        return upload_img_user_profile(current_user.id)
    if request.method == "GET":
        return get_img_user_profile(current_user.id)
    if request.method == "PUT":
        return update_img_user_profile(current_user.id)
    if request.method == "DELETE":
        return delete_img_user_profile(current_user.id)
    return jsonify({"msg": "Method not allowed"}), 405