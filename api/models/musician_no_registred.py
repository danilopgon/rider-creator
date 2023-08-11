from utils.db import db


class Musician_Not_Registred(db.Model):
    __tablename__ = 'musician_not_registred'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    #bands = db.relationship('Band', backref=db.backref('musician_not_registred', lazy=True))
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name
        }   