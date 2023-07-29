from utils.db import db
from models.musician import Musician
from models.musician_no_registred import Musician_Not_Registred

class Band_Members(db.Model):
    __tablename__ = "band_members"
    id = db.Column(db.Integer, primary_key=True, unique=True)
    musician_id = db.Column(db.Integer, db.ForeignKey("musician.id"), nullable=True)
    musician_not_registred_id = db.Column(db.Integer, db.ForeignKey("musician_not_registred.id"), nullable=True)
    band_id = db.Column(db.Integer, db.ForeignKey("bands.id"), nullable=False)
