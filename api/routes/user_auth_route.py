from controllers.user_auth_controller import set_register, set_login
from flask import Flask, request, Blueprint,jsonify
from models.users import User
from flask_bcrypt import Bcrypt


user_auth = Blueprint('user_auth', __name__)

@user_auth.route('/register', methods=['POST'])
def user_register():
    data = request.data
    if not data:
        return {'error': 'No data received'}
    response = set_register(data)
    return jsonify(response)
    
@user_auth.route('/login', methods=['POST'])
def user_login():
    data = request.data
    if not data:
        return {'error': 'No data received'}
    response = set_login(data)
    return jsonify(response)

@user_auth.route('/active/<token>', methods=['POST'])
def user_active(token):
    
    return jsonify({'status': 'ok'})