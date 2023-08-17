from utils.db import db

class Conversation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id1 = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False, primary_key=True)
    user_id2 = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False, primary_key=True)
    updated_at = db.Column(db.DateTime, nullable=False)
    messages = db.relationship('Message', backref='conversation', lazy=True) 
    def serialize(self):
        return {
            "id": self.id,
            "user_id1": self.user_id1.serialize(),
            "user_id2": self.user_id2.serialize(),
            "messages": [message.serialize() for message in self.messages],
            "updated_at": self.updated_at,
        }