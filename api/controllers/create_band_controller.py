from utils.db import db
from models.band import Band
from models.band_members import Band_Members
from models.musician import Musician
from models.users import User

from flask import Flask, jsonify, request


def create_band_controller():
    try:
        data = request.get_json()
        name = data['name']
        members = data['members']
        
        if not name or not  members or len(members) == 0:
            return jsonify({'message': 'Missing data'}), 400
        if Band.query.filter_by(name=name).first():
            return jsonify({'message': 'Band already exists'}), 400
        band = Band()
        band.name = name
        db.session.add(band)
        db.session.commit()
        find_band = Band.query.filter_by(name=name).first()
        for member in members:   
            band_member = Band_Members()
            band_member.band_id = find_band.id
            band_member.musician_id = member.get('id')
            db.session.add(band_member)
            db.session.commit()
        return jsonify({'message': 'Band created'}), 200
    except ValueError as e:
        print(jsonify({'message': str(e)}))
        return jsonify({'message': str(e)}), 500
    
    

