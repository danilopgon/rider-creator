from flask import Blueprint, request, jsonify
from utils.db import db
import cloudinary
import cloudinary.uploader
import cloudinary.api


from models.users import User



def upload_img_user_profile(id):
    if "file" not in request.files:
        return jsonify({"msg": "No file selected"}), 400
    file = request.files["file"]
    if file.filename == "":
        return jsonify({"msg": "No file selected"}), 400
    if file:
        custom_name = f"user-profile-{id}"
        result = cloudinary.uploader.upload(file, public_id=custom_name)
        img_url = result["secure_url"]
        user = User.query.filter_by(id=id).first()
        user.img = img_url
        db.session.commit()
        return jsonify({"msg": "Image uploaded successfully"}), 200
    return jsonify({"msg": "Something went wrong"}), 500

def get_img_user_profile(id):
    user = User.query.filter_by(id=id).first()
    if not user:
        return jsonify({"msg": "User not found"}), 404
    return jsonify({"img_url": user.img}), 200

def update_img_user_profile(id):
    if "file" not in request.files:
        return jsonify({"msg": "No file selected"}), 400
    file = request.files["file"]
    if file.filename == "":
        return jsonify({"msg": "No file selected"}), 400
    if file:
        custom_name = f"user-profile-{id}"
        result = cloudinary.uploader.upload(file, public_id=custom_name)
        img_url = result["secure_url"]
        user = User.query.filter_by(id=id).first()
        user.img = img_url
        db.session.commit()
        return jsonify({"msg": "Image updated successfully"}), 200
    return jsonify({"msg": "Something went wrong"}), 500

def delete_img_user_profile(id):
    user = User.query.filter_by(id=id).first()
    if not user:
        return jsonify({"msg": "User not found"}), 404
    if user.img:
        public_id = user.img.split("/")[-1].split(".")[0]
        cloudinary.uploader.destroy(public_id)
        user.img = None
        db.session.commit()
        return jsonify({"msg": "Image deleted successfully"}), 200
    return jsonify({"msg": "Something went wrong"}), 500