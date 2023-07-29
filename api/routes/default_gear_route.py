from utils.config_default_gear import config_default_gear
from controllers.default_gear_controller import get_gear
from flask import Blueprint

default_gear = Blueprint("config_default_gear", __name__)


@default_gear.route("/", methods=["GET"])
def get_default_gear_route():
    return get_gear()


@default_gear.route("/database-configuration", methods=["GET"])
def config_default_gear_route():
    config_default_gear()
    return "Default gear configuration complete."
