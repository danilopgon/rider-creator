from utils.db import db


class Managers_Venues(db.Model):
    __tablename__ = "managers_venues"
    id = db.Column(db.Integer, primary_key=True, unique=True)
    manager_id = db.Column(
        db.Integer, db.ForeignKey("venue_manager.id"), nullable=False
    )
    venue_id = db.Column(db.Integer, db.ForeignKey("venue.id"), nullable=False)
