from utils.db import db


class Venue_Manager(db.Model):
    __tablename__ = "venue_manager"
    id = db.Column(db.Integer, primary_key=True, unique=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    venues = db.relationship("Venue", backref="managers_venues", lazy=True)
    active_role = db.Column(db.Boolean, nullable=False, default=False)
