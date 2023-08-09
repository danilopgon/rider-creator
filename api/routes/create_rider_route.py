from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from controllers.create_rider_controller import create_rider_controller, get_all_riders_by_band_controller, update_rider_controller


create_rider = Blueprint('create_rider', __name__)

@create_rider.route('/', methods=['POST', 'GET','PUT'])
def rider():
    if request.method == 'POST':
        return create_rider_controller()
    
    if request.method == 'GET':
        return get_all_riders_controller()
    
    if request.method == 'PUT':
        return update_rider_controller()