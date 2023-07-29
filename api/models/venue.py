from utils.db import db
from models.address import Address

class Venue(db.Model):
    __tablename__ = "venue"
    id = db.Column(db.Integer, primary_key=True, unique=True)
    name = db.Column(db.String(255), nullable=False)
    capacity = db.Column(db.Integer, nullable=False)
    address = db.relationship("Address", backref="venue", lazy=True)
