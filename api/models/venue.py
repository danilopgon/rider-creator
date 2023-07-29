from utils.db import db


class Venue(db.Model):
    __tablename__ = "venue"
    id = db.Column(db.Integer, primary_key=True, unique=True)
    name = db.Column(db.String(255), nullable=False)
    capacity = db.Column(db.Integer, nullable=False)
    address = db.relationship("Address", backref="venue", lazy=True)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "capacity": self.capacity,
            "address": self.address.serialize(),
        }
