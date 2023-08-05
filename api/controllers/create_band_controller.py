from utils.db import db
from models.band import Band
from models.band_members import Band_Members
from models.musician import Musician
from models.musician_no_registred import Musician_Not_Registred


from flask import Flask, jsonify, request
import json

def create_band_controller():
    try:
        print(request.data)
        data = json.loads(request.data)
        
        name = data.get('name')
        if not name:
            return jsonify({'message': 'Missing data name'}), 400
        members = data.get('members')
        if not members or len(members) == 0:
            return jsonify({'message': 'Missing data members'}), 400
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
            
            find_member = Musician.query.filter_by(id=member.get('id')).first()
            if find_member is None:
                not_regirstred = Musician_Not_Registred()
                not_regirstred.name = member.get('username')
                not_regirstred.band_id = find_band.id
                db.session.add(not_regirstred)
                db.session.commit()
                find_not_regirstred = Musician_Not_Registred.query.filter_by(name=member.get('username')).first()
                band_member.musician_not_registred_id = find_not_regirstred.id
                band_member.musician_id = None
                db.session.add(band_member)
                db.session.commit()
                return jsonify({'status': 200, 'message': 'Band created', 'msg': 'user not regitred'}), 200
                
            band_member.musician_id = member.get('id')
            band_member.musician_not_registred_id = None
            db.session.add(band_member)
            db.session.commit()
        return jsonify({'status': 200,'message': 'Band created'}), 200
    except ValueError as e:
        print(jsonify({'message': str(e)}))
        return jsonify({'message': str(e)}), 500
    
    
try:
    def get_all_bands_controller():
        bands = Band.query.all()
        if not bands:
            return jsonify({'message': 'There are no bands'}), 404
        return jsonify([band.serialize() for band in bands]), 200
except ValueError as e:
    print(jsonify({'message': str(e)})), 500

try:
    def get_band_by_id_controller(id):
        if id is None:
            return jsonify({'message': 'Missing data'}), 400
        band = Band.query.filter_by(id=id).first()
        if not band:
            return jsonify({'message': 'Band not found'}), 404
        return jsonify(band.serialize()), 200
except ValueError as e:
    print(jsonify({'message': str(e)})), 500
    
try:
    def get_band_by_name_controller(name):
        if name is None:
            return jsonify({'message': 'Missing data'}), 400
        band = Band.query.filter_by(name=name).first()
        if not band:
            return jsonify({'message': 'Band not found'}), 404
        return jsonify(band.serialize()), 200
except ValueError as e:
    print(jsonify({'message': str(e)})), 500
    
try:
    def delete_band_by_id_controller(id):
        if id is None:
            return jsonify({'message': 'Missing data'}), 400
        band = Band.query.filter_by(id=id).first()
        if not band:
            return jsonify({'message': 'Band not found'}), 404
        db.session.delete(band)
        db.session.commit()
        return jsonify({'message': 'Band deleted'}), 200
except ValueError as e:
    print(jsonify({'message': str(e)})), 500
    
try:
    def update_band_controller():
        data = request.get_json()
        id = data['id']
        name = data['name']
        members = data['members']
        
        if not id or not name or not members or len(members) == 0:
            return jsonify({'message': 'Missing data'}), 400
        band = Band.query.filter_by(id=id).first()
        if not band:
            return jsonify({'message': 'Band not found'}), 404
        band.name = name
        db.session.commit()
        
        for member in members:
            if member.get('id') is None:
                band_member = Band_Members()
                band_member.band_id = id
                not_regirstred = Musician_Not_Registred()
                not_regirstred.name = member.get('name')
                not_regirstred.band_id = id
                db.session.add(not_regirstred)
                db.session.commit()
                find_not_regirstred = Musician_Not_Registred.query.filter_by(name=member.get('name')).first()
                band_member.musician_not_registred_id = find_not_regirstred.id
                band_member.musician_id = None
                db.session.add(band_member)
                db.session.commit()
                return jsonify({'message': 'Band updated', 'msg': 'user not regitred'}), 200
            band_member = Band_Members()
            band_member.band_id = id
            band_member.musician_id = member.get('id')
            band_member.musician_not_registred_id = None
            db.session.add(band_member)
            db.session.commit()
        return jsonify({'message': 'Band updated'}), 200
except ValueError as e:
    print(jsonify({'message': str(e)}), 500)
    
try:
    def get_all_bands_by_musician_id_controller(id):
        if id is None:
            return jsonify({'message': 'Missing data'}), 400
        find_musician = Musician.query.filter_by(user_id=id).first()
        if not find_musician.active_role:
            return jsonify({'message': 'Musician not found'}), 404
        
        bands = Band_Members.query.filter_by(musician_id=find_musician.id).all()
        if not bands:
            return jsonify({'message': 'There are no bands'}), 404
        return jsonify([band.serialize() for band in bands]), 200
except ValueError as e:
    print(jsonify({'message': str(e)})), 500