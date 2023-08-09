from utils.db import db


class Rider(db.Model):
    __tablename__ = "rider"
    id = db.Column(db.Integer, primary_key=True, unique=True)
    band_id = db.Column(db.Integer, db.ForeignKey("bands.id"), nullable=False)
    venue_id = db.Column(db.Integer, db.ForeignKey("venue.id"), nullable=False)
    technician_id = db.Column(db.Integer, db.ForeignKey("technician.id"), nullable=True)
    date = db.Column(db.DateTime, nullable=False)
    technician_id = db.Column(
        db.Integer, db.ForeignKey("technician.id"), nullable=True
    )

    gear = db.relationship("Gear", backref="rider", lazy=True, secondary="rider_gear")

    def serialize(self):
        return {
            "id": self.id,
            "band_id": self.band_id,
            "venue_id": self.venue_id,
            "technician_id": self.technician_id,
            "date": self.date,
            "gears": [gear.serialize() for gear in self.gear if gear.rider_id == self.id]

        }
