from utils.db import db


class Rider_Gear(db.Model):
    __tablename__ = "rider_gear"
    id = db.Column(db.Integer, primary_key=True, unique=True)
    rider_id = db.Column(db.Integer, db.ForeignKey("rider.id"), nullable=False)
    gear_id = db.Column(db.Integer, db.ForeignKey("gear.id"), nullable=False)
    coordinates_x = db.Column(db.Integer, nullable=False)
    coordinates_y = db.Column(db.Integer, nullable=False)
    notes = db.Column(db.String(255), nullable=False)
    order = db.Column(db.Integer, nullable=False)
    
    def serialize(self):
        return {
            "id": self.id,
            "rider_id": self.rider_id,
            "gear_id": self.gear_id,
            "coordinates_x": self.coordinates_x,
            "coordinates_y": self.coordinates_y,
            "notes": self.notes,
            "order": self.order
        }
