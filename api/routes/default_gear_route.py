from utils.config_default_gear import config_default_gear
from flask import Blueprint

default_gear = Blueprint("config_default_gear", __name__)


@default_gear.route("/", methods=["GET"])
def config_default_gear_route():
    return config_default_gear()
