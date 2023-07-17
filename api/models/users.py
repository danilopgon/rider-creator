from utils.db import db

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True, unique=True)
    username = db.Column(db.String(255))
    email = db.Column(db.String(255), unique=True)
    password = db.Column(db.String(255))
    active = db.Column(db.Boolean, nullable=False, default=False)
    provisional_token = db.relationship('Provisional_token', backref='user', lazy=True)
    
    def serialize(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }