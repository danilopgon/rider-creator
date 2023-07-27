from utils.db import db


class Venue(db.Model):
    __tablename__ = "venue"
    id = db.Column(db.Integer, primary_key=True, unique=True)
    address_id = db.Column(db.Integer, db.ForeignKey("address.id"), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    capacity = db.Column(db.Integer, nullable=False)
