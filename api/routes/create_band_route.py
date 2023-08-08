from flask import Flask, request, jsonify, Blueprint
from controllers.create_band_controller import (create_band_controller, get_all_bands_controller,
                                                get_band_by_id_controller, delete_band_by_id_controller, 
                                                update_band_controller, get_band_by_name_controller, 
                                                get_all_bands_by_musician_id_controller)
from flask_jwt_extended import jwt_required, get_jwt_identity

create_band = Blueprint('create_band', __name__)

@create_band.route('/', methods=['POST', 'GET','PUT'])
@jwt_required
def band():
    if request.method == 'POST':
        current_user = get_jwt_identity()
        if current_user is None:
            return jsonify({"msg": "Missing Authorization Header, token is empty"}), 401
        return create_band_controller()
    
    if request.method == 'GET':
        current_user = get_jwt_identity()
        if current_user is None:
            return jsonify({"msg": "Missing Authorization Header, token is empty"}), 401
        return get_all_bands_controller()
    
    if request.method == 'PUT':
        current_user = get_jwt_identity()
        if current_user is None:
            return jsonify({"msg": "Missing Authorization Header, token is empty"}), 401
        return update_band_controller()
    
    
    

    
@create_band.route('/<id>', methods=['GET', 'DELETE'])
@jwt_required
def band_by_id(id):
    if request.method == 'GET':
        current_user = get_jwt_identity()
        if current_user is None:
            return jsonify({"msg": "Missing Authorization Header, token is empty"}), 401
        return get_band_by_id_controller(id)
    if request.method == 'DELETE':
        current_user = get_jwt_identity()
        if current_user is None:
            return jsonify({"msg": "Missing Authorization Header, token is empty"}), 401
        return delete_band_by_id_controller(id)
    
@create_band.route('/name/<name>', methods=['GET'])
@jwt_required
def band_by_name(name):
    if request.method == 'GET':
        current_user = get_jwt_identity()
        if current_user is None:
            return jsonify({"msg": "Missing Authorization Header, token is empty"}), 401
        return get_band_by_name_controller(name)
    
@create_band.route('/band_by_user', methods=['GET'])
@jwt_required
def get_band_by_member():
    if request.method == 'GET':
        current_user = get_jwt_identity()
        if current_user is None:
            return jsonify({"msg": "Missing Authorization Header, token is empty"}), 401
        return get_all_bands_by_musician_id_controller(current_user)