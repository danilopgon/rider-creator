from flask import Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity

from controllers.create_venue_controller import (
    create_venue,
    get_all_venues,
    get_venue_by_id,
    delete_venue_by_id,
    update_venue,
    get_all_venues_by_manager_id,
)

create_venue_route = Blueprint("create_venue_route", __name__)


@create_venue_route.route("/", methods=["POST"])
@jwt_required()
def create_venue_controller():
    manager_id = get_jwt_identity().get("venue_manager_id")
    return create_venue(manager_id)


@create_venue_route.route("/", methods=["GET"])
@jwt_required()
def get_all_venues_controller():
    return get_all_venues()


@create_venue_route.route("/manager/<int:manager_id>", methods=["GET"])
@jwt_required()
def get_all_venues_by_manager_id_controller(manager_id):
    return get_all_venues_by_manager_id(manager_id)


@create_venue_route.route("/<int:venue_id>", methods=["GET"])
@jwt_required()
def get_venue_by_id_controller(venue_id):
    return get_venue_by_id(venue_id)


@create_venue_route.route("/<int:venue_id>", methods=["DELETE"])
@jwt_required()
def delete_venue_by_id_controller(venue_id):
    manager_id = get_jwt_identity().get("manager_id")
    return delete_venue_by_id(venue_id, manager_id)


@create_venue_route.route("/<int:venue_id>", methods=["PUT"])
@jwt_required()
def update_venue_controller(venue_id):
    manager_id = get_jwt_identity().get("manager_id")
    return update_venue(venue_id, manager_id)
