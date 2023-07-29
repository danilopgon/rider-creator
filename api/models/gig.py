from utils.db import db


class Gig(db.Model):
    __tablename__ = "gig"
    id = db.Column(db.Integer, primary_key=True, unique=True)
    date = db.Column(db.Date, nullable=False)
    venue_id = db.Column(db.Integer, db.ForeignKey("venue.id"), nullable=False)
    #bands = db.relationship("Bands", backref="band_gigs", lazy=True)
