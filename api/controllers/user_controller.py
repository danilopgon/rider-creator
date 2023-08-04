from flask import jsonify
from models.users import User
from utils.db import db
import json

def find_users_by_name(user_name):
    if user_name == None:
        return jsonify({"error":400,"status": "error","message": "Need user name"}), 400
    list_include_name = User.query.filter(User.username.like("%"+user_name+"%")).all()
    if list_include_name != None or list_include_name != [] or list_include_name.length != 0:
        return jsonify({"status": "success","message": "User already exists", "user": [{'user': user.serialize_for_jwt()}for user in list_include_name]}), 200
    return jsonify({"error":404,"status": "error","message": "User does not exist"}), 404

