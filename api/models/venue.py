from utils.db import db


class Venue(db.Model):
    __tablename__ = "venue"
    id = db.Column(db.Integer, primary_key=True, unique=True)
    manager_id = db.Column(
        db.Integer, db.ForeignKey("venue_manager.id"), nullable=False
    )
    name = db.Column(db.String(255), nullable=False)
    capacity = db.Column(db.Integer, nullable=False)
    address = db.relationship("Address", backref="venue", lazy=True, uselist=False)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "capacity": self.capacity,
            "manager_id": self.manager_id,
            "address": self.address.serialize(),
        }
