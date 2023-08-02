from utils.db import db


class Rider_Gear(db.Model):
    __tablename__ = "rider_gear"
    id = db.Column(db.Integer, primary_key=True, unique=True)
    rider_id = db.Column(db.Integer, db.ForeignKey("rider.id"), nullable=False)
    gear_id = db.Column(db.Integer, db.ForeignKey("gear.id"), nullable=False)
    gear_coordinates = db.Column(db.String(255), nullable=False)
