from models import Gear_Type
from flask import jsonify


def get_gear():
    try:
        gear = Gear_Type.query.all()
        return jsonify([e.serialize() for e in gear]), 200
    except Exception as e:
        return str(e), 400
