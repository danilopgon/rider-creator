from flask import Blueprint, Flask, request
from flask_jwt_extended import jwt_required
from controllers.role_register_controller import user_role_register


role_register_route = Blueprint('role_register_route', __name__)

@role_register_route.route('/', methods=['POST'])
@jwt_required()
def role_register():
    if request.method == 'POST':
        return user_role_register()