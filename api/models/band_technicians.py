from utils.db import db


class Band_Technicians(db.Model):
    __tablename__ = "band_technicians"
    id = db.Column(db.Integer, primary_key=True, unique=True)
    band_id = db.Column(db.Integer, db.ForeignKey("band.id"), nullable=False)
    technician_id = db.Column(
        db.Integer, db.ForeignKey("technician.id"), nullable=False
    )
