from utils.db import db
from models.rider_gear import Rider_Gear
from models.band import Band
from models.venue import Venue
class Rider(db.Model):
    __tablename__ = "rider"
    id = db.Column(db.Integer, primary_key=True, unique=True)
    uid = db.Column(db.String(255), nullable=False, unique=True)
    band_id = db.Column(db.Integer, db.ForeignKey("bands.id"), nullable=False)
    venue_id = db.Column(db.Integer, db.ForeignKey("venue.id"), nullable=False)
    technician_id = db.Column(db.Integer, db.ForeignKey("technician.id"), nullable=True)
    date = db.Column(db.DateTime, nullable=False)

    gears = db.relationship("Gear", backref="rider", lazy='dynamic', secondary="rider_gear")
   
    
    def serialize(self):
        return {
            "id": self.id,
            "uid": self.uid,
            "band_id": self.band_id,
            "venue_id": self.venue_id,
            "technician_id": self.technician_id,
            "date": self.date,
            "gears": []

        }
    
    def public_serialize_with_gears(self):
        band = Band.query.get(self.band_id)
        venue = Venue.query.get(self.venue_id)
        return {
            "id": self.id,
            "uid": self.uid,
            "band_name": band.name if band else None,
            "venue_name": venue.name if venue else None,
            "date": self.date,
            "gears": [gear.public_serialize() for gear in self.gears]
        }