from utils.db import db
from models.band import Band
from models.band_members import Band_Members
from models.musician import Musician
from models.users import User

from flask import Flask, jsonify, request
import json

def set_band():
    try:
        if request.json.get('name') is None or request.json.get('members') is None:
            return jsonify({'status': 'error', 'message': 'need parameters'})
        name = request.json.get('name')
        members = request.json.get('members')
        
        band = Band()
        band.name = name
        band.members = members
        db.session.add(band)
        db.session.commit()

        return  {'status': 'success', 'msg': 'new band added'}, 200

    except ValueError:
        return {'status': 'error', 'msg':f'Value error {ValueError}' }
    
    
    
    

