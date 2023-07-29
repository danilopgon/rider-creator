from utils.db import db


class Band_Members(db.Model):
    __tablename__ = "band_members"
    id = db.Column(db.Integer, primary_key=True, unique=True)
    musician_id = db.Column(db.Integer, db.ForeignKey("musician.id"), nullable=False)
    band_id = db.Column(db.Integer, db.ForeignKey("bands.id"), nullable=False)
