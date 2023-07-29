from models import Gear_Type
from flask import jsonify


def get_gear():
    gear = Gear_Type.query.all()
    return jsonify([g.serialize() for g in gear])
