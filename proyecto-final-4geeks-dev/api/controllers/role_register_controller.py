from utils.db import db
from flask import Flask, request, jsonify
from models.users import User
from models.musician import Musician
from models.venue_manager import Venue_Manager
from models.technician import Technician
from flask_jwt_extended import get_jwt_identity, create_access_token
import json

def generate_newToken(current_user):
    find_user = User.query.filter_by(id=current_user.get('id')).first()
    return create_access_token(identity=find_user.serialize_for_jwt())
    
    
def user_role_register():
    try:
        current_user = get_jwt_identity()
        
        
        data = json.loads(request.data)
        if data is None:
            return jsonify({'status': 400, 'message': 'No data provided'}), 400
        
        if data.get('role') is None:
            return jsonify({'status': 400,'message': 'No role provided'}), 400
        
        if data.get('role') != 'musician' and data.get('role') != 'manager' and data.get('role') != 'technician':
            return jsonify({'status': 400,'message': 'Invalid role provided'}), 400
        
        if data.get('role') == 'musician':
            if Musician.query.filter_by(user_id=current_user.get('id')).first() is not None:
                return jsonify({'status': 400, 'message': 'Musician role already exists'}), 400
            musician = Musician()
            musician.user_id = current_user.get('id')
            musician.active_role = True
            db.session.add(musician)
            db.session.commit()
            return jsonify({'status':'success', 'message': 'Musician role added successfully', 'token': generate_newToken(current_user)}), 200
        
        if data.get('role') == 'manager':
            if Venue_Manager.query.filter_by(user_id=current_user.get('id')).first() is not None:
                return jsonify({'status': 400,'message': 'Manager role already exists'}), 400
            manager = Venue_Manager()
            manager.user_id = current_user.get('id')
            manager.active_role = True
            db.session.add(manager)
            db.session.commit()
            return jsonify({'status':'success', 'message': 'Manager role added successfully', 'token': generate_newToken(current_user)}), 200
        
        if data.get('role') == 'technician':
            if Technician.query.filter_by(user_id=current_user.get('id')).first() is not None:
                return jsonify({'status': 400, 'message': 'Technician role already exists'}), 400
            technician = Technician()
            technician.user_id = current_user.get('id')
            technician.active_role = True
            db.session.add(technician)
            db.session.commit()
            return jsonify({'status':'success','message': 'Technician role added successfully', 'token': generate_newToken(current_user)}), 200
        
        
    except ValueError as e:
        print(e)
        return jsonify({'message': str(e)}), 500