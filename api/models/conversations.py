from utils.db import db

class Conversation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, nullable=False)
    messages = db.relationship('Message', backref='conversation', lazy=True)
    users = db.relationship('Conversation_User', backref='conversation', lazy=True)
    
    def serialize(self):
        return {
            "id": self.id,
            "created_at": self.created_at,
            "messages": [message.serialize() for message in self.messages],
            "users": [user.serialize() for user in self.users]
        }