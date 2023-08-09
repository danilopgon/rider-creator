from flask import Flask, request, jsonify, Blueprint
from controllers.create_band_controller import (create_band_controller, get_all_bands_controller,
                                                get_band_by_id_controller, delete_band_by_id_controller, 
                                                update_band_controller, get_band_by_name_controller, 
                                                get_all_bands_by_musician_id_controller)
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request

create_band = Blueprint('create_band', __name__)

@create_band.route('/', methods=['POST', 'GET','PUT'])
def band():
    if request.method == 'POST':
        return create_band_controller()
    
    if request.method == 'GET':
        return get_all_bands_controller()
    
    if request.method == 'PUT':
        return update_band_controller()
    
    
    

    
@create_band.route('/<id>', methods=['GET', 'DELETE'])
def band_by_id(id):
    if request.method == 'GET':
        return get_band_by_id_controller(id)
    if request.method == 'DELETE':
        return delete_band_by_id_controller(id)
    
@create_band.route('/name/<name>', methods=['GET'])
def band_by_name(name):
    if request.method == 'GET':
        return get_band_by_name_controller(name)
    
@create_band.route('/band_by_user', methods=['GET'])
def get_band_by_member():
    if request.method == 'GET':
        
        return get_all_bands_by_musician_id_controller(1)