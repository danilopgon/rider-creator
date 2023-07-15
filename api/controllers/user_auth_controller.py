from flask import Flask, request
import json
from models.users import User
from utils.db import db 
from utils.crypt import bcrypt
def set_register(data):
    if data is None:
        return {'message': 'Missing data'}, 400
    data = json.loads(data)
    if data.get('username') and data.get('email') and data.get('password'):
        if User.query.filter_by(email=data['email']).first() or User.query.filter_by(username=data['username']).first():
            return {'message': 'User already exists'}, 400
        else:
            user = User(username=data['username'], email=data['email'], password=data['password'])
            user.username = data.get('username')
            user.email = data.get('email')
            password_hash = bcrypt.generate_password_hash(data.get('password'))
            user.password = password_hash
            db.session.add(user)
            db.session.commit()
            return {'message': 'User created successfully'}, 201
        
def set_login(data):
    data = json.loads(data)
    find_user = User.query.filter_by(email=data.get('email')).first()
    if find_user:
        if bcrypt.check_password_hash(find_user.password, data.get('password')):
            return {'message': 'Login successful'}, 200
        else:
            return {'message': 'Invalid password'}, 400
    else:
        return {'message': 'User not found'}, 404