from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from controllers.create_rider_controller import (create_rider_controller, get_all_riders_by_band_controller, update_rider_controller,delete_rider_controller)


create_rider = Blueprint('create_rider', __name__)

@create_rider.route('/', methods=['POST', 'GET',])
@jwt_required()
def rider():
    if request.method == 'POST':
        return create_rider_controller()
    
    if request.method == 'PUT':
        return update_rider_controller()
    return jsonify({"msg": "Method not allowed"}), 405

@create_rider.route('/by-band/<id>', methods=['GET'])
@jwt_required()
def rider_by_band(id):
    if request.method == 'GET':
        return get_all_riders_by_band_controller(id)
    return jsonify({"msg": "Method not allowed"}), 405
    
@create_rider.route('/<id>', methods=['DELETE'])
@jwt_required()
def delete_rider(id):
    if request.method == 'DELETE':
        return delete_rider_controller(id)
    return jsonify({"msg": "Method not allowed"}), 405