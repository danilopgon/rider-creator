from flask import Blueprint

from .user_auth_route import user_auth
from .default_gear_route import default_gear

api = Blueprint("api", __name__)

api.register_blueprint(user_auth, url_prefix="/auth")
api.register_blueprint(default_gear, url_prefix="/default-gear")
