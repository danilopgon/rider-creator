from utils.db import db


class Band(db.Model):
    __tablename__ = "band"
    id = db.Column(db.Integer, primary_key=True, unique=True)
    name = db.Column(db.String(255))
    members = db.relationship("Members", backref="band_members", lazy=True)
    gigs = db.relationship("Gigs", backref="band_gigs", lazy=True)
    technicians = db.relationship("Technicians", backref="band_technicians", lazy=True)
    riders = db.relationship("Riders", backref="band_riders", lazy=True)
