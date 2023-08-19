from flask import Blueprint

from .user_auth_route import user_auth
from .create_band_route import create_band
from .create_venue_route import create_venue_route
from .default_gear_route import default_gear
from .role_register_route import role_register_route
from .users_route import users_routes
from .create_rider_route import create_rider
from .images_route import images_routes
from .sockets_routes import chat


api = Blueprint("api", __name__)


api.register_blueprint(user_auth, url_prefix="/auth")
api.register_blueprint(default_gear, url_prefix="/default-gear")
api.register_blueprint(create_band, url_prefix="/band")
api.register_blueprint(create_venue_route, url_prefix="/venue")
api.register_blueprint(role_register_route, url_prefix="/role-register")
api.register_blueprint(users_routes, url_prefix="/users")
api.register_blueprint(create_rider, url_prefix="/rider")
api.register_blueprint(images_routes, url_prefix="/images")
api.register_blueprint(chat, url_prefix="/chat")