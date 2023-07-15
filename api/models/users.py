from utils.db import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, unique=True)
    username = db.Column(db.String(255))
    email = db.Column(db.String(255), unique=True)
    password = db.Column(db.String(255))
    
    def serialize(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }