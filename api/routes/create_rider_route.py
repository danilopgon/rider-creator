from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from controllers.create_rider_controller import create_rider_controller, get_all_riders_controller, update_rider_controller


create_rider = Blueprint('create_rider', __name__)

@create_rider.route('/', methods=['POST', 'GET','PUT'])
@jwt_required
def rider():
    if request.method == 'POST':
        current_user = get_jwt_identity()
        if current_user is None:
            return jsonify({"msg": "Missing Authorization Header, token is empty"}), 401
        return create_rider_controller()
    
    if request.method == 'GET':
        current_user = get_jwt_identity()
        if current_user is None:
            return jsonify({"msg": "Missing Authorization Header, token is empty"}), 401
        return get_all_riders_controller()
    
    if request.method == 'PUT':
        current_user = get_jwt_identity()
        if current_user is None:
            return jsonify({"msg": "Missing Authorization Header, token is empty"}), 401
        return update_rider_controller()