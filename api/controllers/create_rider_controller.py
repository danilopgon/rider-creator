from  flask import jsonify, request
from utils.db import db
from models.rider import Rider
from models.rider_gear import Rider_Gear
from models.gear import Gear
from models.band import Band
from models.band_members import Band_Members
from models.rider import Rider
from models.rider_gear import Rider_Gear

import json
from datetime import datetime
import random
import string

def generate_uid():
    uid = ''.join(random.choices(string.ascii_lowercase + string.digits, k=6))
    return uid

def create_rider_controller():
    try:
        if request.data is None:
            print(request.data)
            return jsonify({"msg": "Missing data in request line12"}), 400
        data = json.loads(request.data)
        print(data)
        band_id = data.get('band_id')
        venue_id = data.get('venue_id')
        technician_id = data.get('technician_id')
        date = datetime.strptime(data.get('date'), "%Y-%m-%d %H:%M:%S") 
        gears = data.get('gears')
        
        if band_id is None or venue_id is None or date is None or len(gears) == 0:
            return jsonify({"msg": "Missing data in request line22"}), 400
        
        if len(gears) == 0:
            return jsonify({"msg": "Missing data in request, gears is empty"}), 400
        checking_rider = Rider.query.filter_by(band_id=band_id, venue_id=venue_id, technician_id=technician_id, date=date).first()
        
        if checking_rider is not None:
            return jsonify({"msg": "Rider already exists"}), 400
        
        for gear in gears:
            if (gear.get('order') is None or gear.get('gear_id') is None 
                or gear.get('coordinates_x') is None or gear.get('coordinates_y') is None 
                or gear.get('notes') is None):
                return jsonify({"msg": "Missing data in request line35"}), 400
        
        rider = Rider()
        rider.uid = generate_uid()  # Generate a new UID and assign it to the `uid` attribute of the `Rider` object
        rider.band_id=band_id
        rider.venue_id=venue_id
        rider.technician_id=technician_id
        rider.date=date
        db.session.add(rider)
        db.session.commit()
        
        find_rider = Rider.query.filter_by(band_id=band_id, venue_id=venue_id, technician_id=technician_id, date=date).first()
        if find_rider is None:
            return jsonify({"msg": "Rider not found"}), 404
        for gear in gears:
            #gear = json.loads(gear)
            rider_id = find_rider.id
            gear_id = gear.get('gear_id')
            coordinates_x = gear.get('coordinates_x')
            coordinates_y = gear.get('coordinates_y')
            notes = gear.get('notes')
            order = gear.get('order')
            
            rider_gear = Rider_Gear()
            rider_gear.rider_id=rider_id
            rider_gear.gear_id=gear_id
            rider_gear.coordinates_x=coordinates_x
            rider_gear.coordinates_y=coordinates_y
            rider_gear.notes=notes
            rider_gear.order=order
            db.session.add(rider_gear)
            db.session.commit()
        return jsonify({"msg": "Rider created successfully"}), 200
    except ValueError as e:
        print(e)
        return jsonify({"msg": "Internal server error"}), 500     
    

def get_rider_controller(id):
    try:
        if id is None:
            return jsonify({"msg": "Missing data in request, id is empty"}), 400
        
        rider = Rider.query.filter_by(id=id).first()
        if rider is None:
            return jsonify({"msg": "Rider not found"}), 404
        
        rider_serialezed = rider.serialize()
        gears = Rider_Gear.query.filter_by(rider_id=rider_serialezed.get('id')).all()
        rider_serialezed.get('gears').extend([gear.serialize() for gear in gears])
        return jsonify({'rider':rider_serialezed}), 200
    except ValueError as e:
        print(e)
        return jsonify({"msg": "Internal server error"}), 500
    

def get_all_riders_by_user_controller(musician_id):
    try:
        if musician_id is None:
            return jsonify({"msg": " musician_id is empty"}), 400
        
        

        band_members = Band_Members.query.filter_by(musician_id=musician_id).all()
        band_ids = [band_member.band_id for band_member in band_members]
        riders = Rider.query.filter(Rider.band_id.in_(band_ids)).all()

        
        if not riders:
            return jsonify({"msg": "Riders not found"}), 404
        
        riders_serialized = [rider.serialize() for rider in riders]
        for rider in riders_serialized:
            gears = Rider_Gear.query.filter_by(rider_id=rider.get('id')).all()
            rider.get('gears').extend([gear.serialize() for gear in gears])    
        return jsonify({'riders':riders_serialized}), 200
    except ValueError as e:
        print(e)
        return jsonify({"msg": "Internal server error"}), 500
    
def get_all_riders_by_band_controller(id):
    try:
        if id is None:
            return jsonify({"msg": "Missing data in request, id is empty"}), 400
        
        riders = Rider.query.filter_by(band_id=id).all()
        if riders is None:
            return jsonify({"msg": "Riders not found"}), 404
        
        riders_serialezed = [rider.serialize() for rider in riders]
        for rider in riders_serialezed:
            gears = Rider_Gear.query.filter_by(rider_id=rider.get('id')).all()
            rider.get('gears').extend([gear.serialize() for gear in gears])    
        return jsonify({'riders':riders_serialezed}), 200
    except ValueError as e:
        print(e)
        return jsonify({"msg": "Internal server error"}), 500




def update_rider_controller():
    try:
        if request.data is None:
            return jsonify({"msg": "Missing data in request"}), 400
        data = json.loads(request.data)
        id = data.get('id')
        rider = Rider.query.filter_by(id=id).first()
        if rider is None:
            return jsonify({"msg": "Rider not found"}), 404
        rider.technician_id=data.get('technician_id')
        rider.date=datetime.strptime(data.get('date'), "%Y-%m-%d %H:%M:%S")
        rider.gears=data.get('gears')
        db.session.commit()
        for gear in rider.gears:
            rider_gear = Rider_Gear.query.filter_by(rider_id=id, gear_id=gear.get('gear_id')).first()
            if rider_gear is None:
                return jsonify({"msg": "Rider gear not found"}), 404
            rider_gear.coordinates_x=gear.get('coordinates_x')
            rider_gear.coordinates_y=gear.get('coordinates_y')
            rider_gear.notes=gear.get('notes')
            rider_gear.order=gear.get('order')
            db.session.commit()
            return jsonify({"msg": "Rider updated successfully"}), 200
    except ValueError as e:
        print(e)
        return jsonify({"msg": "Internal server error"}), 500
    
    
def delete_rider_controller(id):
    try:
        find_rider = Rider.query.filter_by(id=id).first()
        if find_rider is None:
            return jsonify({"msg": "Rider not found"}), 404
        db.session.delete(find_rider)
        db.session.commit()
        return jsonify({"msg": "Rider deleted successfully"}), 200
    except ValueError as e:
        print(e)
        return jsonify({"msg": "Internal server error"}), 500
    

def get_rider_by_technician(id):
    try:
        if id is None:
            return jsonify({"msg": "Missing data in request, id is empty"}), 400
        
        riders = Rider.query.filter_by(technician_id=id).all()
        if riders is None:
            return jsonify({"msg": "Riders not found"}), 404
        
        riders_serialezed = [rider.serialize() for rider in riders]
        for rider in riders_serialezed:
            gears = Rider_Gear.query.filter_by(rider_id=rider.get('id')).all()
            rider.get('gears').extend([gear.serialize() for gear in gears])    
        return jsonify({'riders':riders_serialezed}), 200
    except ValueError as e:
        print(e)
        return jsonify({"msg": "Internal server error"}), 500
    
def get_public_rider_data_by_uid(uid):
    try:
        if uid is None:
            return jsonify({"msg": "Missing data in request, uid is empty"}), 400
        
        rider = Rider.query.filter_by(uid=uid).first()
        if rider is None:
            return jsonify({"msg": "Rider not found"}), 404
        
        rider_serialezed = rider.public_serialize_with_gears()
        return jsonify({'rider':rider_serialezed}), 200
    except ValueError as e:
        print(e)
        return jsonify({"msg": "Internal server error"}), 500