from flask import Flask, request, jsonify, Blueprint
from controllers.create_band_controller import set_band


create_band = Blueprint('create_band', __name__)

@create_band.route('/', methods=['POST', 'GET','PUT', 'DELETE'])
def band():
    if request.method == 'POST':
        return set_band()
    
    if request.method == 'GET':
        return 'esta son tus bandas'
    
    if request.method == 'PUT':
        return 'editado'
    
    if request.method == 'DELETE':
        return 'deleted'