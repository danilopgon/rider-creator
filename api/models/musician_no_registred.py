from utils.db import db

class Musician_No_Registred(db.Model):
    __tablename__ = 'musician_no_registred'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    band = db.relationship('Band', backref=db.backref('musician_no_registred', lazy=True))