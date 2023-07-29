from flask import Blueprint

from .user_auth_route import user_auth
from .create_band_route import create_band
from .default_gear_route import default_gear

api = Blueprint("api", __name__)
from .create_band_route import create_band

api.register_blueprint(user_auth, url_prefix="/auth")
api.register_blueprint(default_gear, url_prefix="/default-gear")
api.register_blueprint(create_band, url_prefix="/band")
