from utils.db import db


class Band_Gigs(db.Model):
    __tablename__ = "band_gigs"
    id = db.Column(db.Integer, primary_key=True, unique=True)
    band_id = db.Column(db.Integer, db.ForeignKey("band.id"), nullable=False)
    gig_id = db.Column(db.Integer, db.ForeignKey("gig.id"), nullable=False)
    tecnician_id = db.Column(db.Integer, db.ForeignKey("technician.id"), nullable=False)
