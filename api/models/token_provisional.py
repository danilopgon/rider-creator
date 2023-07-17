from utils.db import db


class Provisional_token(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    token = db.Column(db.String(300), nullable=False)
    token_exp = db.Column(db.Integer, nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "token": self.token,
            "token_exp": self.token_exp,
        }
