from utils.db import db
from .musician import Musician
from .technician import Technician
from .venue_manager import Venue_Manager


class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True, unique=True)
    username = db.Column(db.String(255))
    email = db.Column(db.String(255), unique=True)
    password = db.Column(db.String(255))
    active = db.Column(db.Boolean, nullable=False, default=False)
    provisional_token = db.relationship("Provisional_token", backref="user", lazy=True)
    musician = db.relationship("Musician", backref="user", uselist=False)
    technician = db.relationship("Technician", backref="user", uselist=False)
    venue_manager = db.relationship("Venue_Manager", backref="user", uselist=False)

    def serialize_for_jwt(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "musician_id": self.musician.id if self.musician else None,
            "technician_id": self.technician.id if self.technician else None,
            "venue_manager_id": self.venue_manager.id if self.venue_manager else None,
        }

    def serialize(self):
        return {"id": self.id, "username": self.username, "email": self.email}
