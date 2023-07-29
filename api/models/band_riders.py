from utils.db import db


class Band_Riders(db.Model):
    __tablename__ = "band_riders"
    id = db.Column(db.Integer, primary_key=True, unique=True)
    band_id = db.Column(db.Integer, db.ForeignKey("bands.id"), nullable=False)
    rider_id = db.Column(db.Integer, db.ForeignKey("rider.id"), nullable=False)
