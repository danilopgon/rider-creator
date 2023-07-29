from flask import Blueprint

from .user_auth_route import user_auth
from .create_band_route import create_band

api = Blueprint('api', __name__)

api.register_blueprint(user_auth, url_prefix='/auth')
api.register_blueprint(create_band, url_prefix='/band')
