from utils.db import db


class Rider(db.Model):
    __tablename__ = "rider"
    id = db.Column(db.Integer, primary_key=True, unique=True)
    venue_id = db.Column(db.Integer, db.ForeignKey("venue.id"), nullable=False)
    gig_id = db.Column(db.Integer, db.ForeignKey("gig.id"), nullable=False)
    band_id = db.Column(db.Integer, db.ForeignKey("bands.id"), nullable=False)
    technician_id = db.Column(
        db.Integer, db.ForeignKey("technician.id"), nullable=False
    )

    gear = db.relationship("Gear", backref="rider", lazy=True, secondary="rider_gear")

    def serialize(self):
        return {
            "id": self.id,
            "band_id": self.band_id,
            "hall_id": self.hall_id,
            "technician_id": self.technician_id,
            "date": self.date,
            "coordinates": self.coordinates,
        }
