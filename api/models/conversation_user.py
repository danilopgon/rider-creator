from utils.db import db

class Conversation_User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id1 = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False, primary_key=True)
    user_id2 = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False, primary_key=True)
    conversation_id = db.Column(db.Integer, db.ForeignKey('conversation.id'), nullable=False, primary_key=True)
    
    def serialize(self):
        return {
            "id": self.id,
            "user_id1": self.user_id1.serialize(),
            "user_id2": self.user_id2.serialize(),
            "conversation_id": self.conversation_id
        }