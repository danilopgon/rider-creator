from flask import Blueprint

from .user_auth_route import user_auth

api = Blueprint('api', __name__)

api.register_blueprint(user_auth, url_prefix='/auth')