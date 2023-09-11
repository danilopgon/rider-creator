from flask import request, jsonify
from models.address import Address
from models.venue import Venue
from models.venue_manager import Venue_Manager
from utils.db import db


def get_all_venues():
    try:
        venues = Venue.query.all()
        return (
            jsonify(
                {
                    "message": "All venues",
                    "venues": [venue.serialize() for venue in venues],
                }
            ),
            200,
        )
    except Exception as error:
        print(error)
        return jsonify({"message": "Something went wrong"}), 500


def create_venue(manager_id):
    try:
        body = request.get_json()

        if not body["name"] or not body["capacity"] or not body["address"]:
            return jsonify({"message": "Invalid request body"}), 400

        if Venue_Manager.query.filter_by(id=manager_id).first() is None:
            return jsonify({"message": "Manager not found"}), 404

        venue_check = Venue.query.filter_by(name=body["name"]).first()

        if venue_check:
            return jsonify({"message": "Venue already exists"}), 400

        venue = Venue(
            name=body["name"],
            capacity=body["capacity"],
            manager_id=manager_id,
        )
        db.session.add(venue)
        db.session.commit()
        address = Address(
            city=body["address"]["city"],
            street=body["address"]["street"],
            number=body["address"]["number"],
            zip_code=body["address"]["zip_code"],
            country=body["address"]["country"],
            type=body["address"]["type"],
            venue_id=venue.id,
        )
        db.session.add(address)
        db.session.commit()
        return (
            jsonify(
                {
                    "message": "Venue created successfully",
                    "venue": venue.serialize(),
                }
            ),
            200,
        )
    except KeyError:
        return jsonify({"message": "Invalid request body"}), 400
    except Exception as error:
        print(error)
        return jsonify({"message": "Something went wrong"}), 500


def get_all_venues_by_manager_id(manager_id):
    try:
        if Venue_Manager.query.filter_by(id=manager_id).first() is None:
            return jsonify({"message": "Manager not found"}), 404

        venues = Venue.query.filter_by(manager_id=manager_id).all()
        return (
            jsonify(
                {
                    "message": "All venues",
                    "venues": [venue.serialize() for venue in venues],
                }
            ),
            200,
        )
    except Exception as error:
        print(error)
        return jsonify({"message": "Something went wrong"}), 500


def get_venue_by_id(venue_id):
    try:
        venue = Venue.query.get(venue_id)

        if not venue:
            return jsonify({"message": "Venue not found"}), 404

        return (
            jsonify(
                {
                    "message": "Venue found",
                    "venue": venue.serialize(),
                }
            ),
            200,
        )

    except Exception as error:
        print(error)
        return jsonify({"message": "Something went wrong"}), 500


def delete_venue_by_id(venue_id, manager_id):
    try:
        venue = Venue.query.get(venue_id)

        if not venue:
            return jsonify({"message": "Venue not found"}), 404

        if venue.manager_id != manager_id:
            return (
                jsonify({"message": "You are not authorized to delete this venue"}),
                403,
            )

        db.session.delete(venue)
        db.session.commit()
        return (
            jsonify(
                {
                    "message": "Venue deleted successfully",
                    "venue": venue.serialize(),
                }
            ),
            200,
        )
    except Exception as error:
        print(error)
        return jsonify({"message": "Something went wrong"}), 500


def update_venue(venue_id, manager_id):
    try:
        body = request.get_json()
        venue = Venue.query.get(venue_id)

        if not venue:
            return jsonify({"message": "Venue not found"}), 404

        if venue.manager_id != manager_id:
            return (
                jsonify({"message": "You are not authorized to delete this venue"}),
                403,
            )

        venue.name = body["name"]
        venue.capacity = body["capacity"]
        venue.address.city = body["address"]["city"]
        venue.address.street = body["address"]["street"]
        venue.address.number = body["address"]["number"]
        venue.address.zip_code = body["address"]["zip_code"]
        venue.address.country = body["address"]["country"]
        venue.address.type = body["address"]["type"]
        db.session.commit()
        return (
            jsonify(
                {
                    "message": "Venue updated successfully",
                    "venue": venue.serialize(),
                }
            ),
            200,
        )
    except KeyError:
        return jsonify({"message": "Invalid request body"}), 400
    except Exception as error:
        print(error)
        return jsonify({"message": "Something went wrong"}), 500
