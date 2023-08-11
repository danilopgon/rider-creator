from utils.db import db


class Gear(db.Model):
    __tablename__ = "gear"
    id = db.Column(db.Integer, primary_key=True, unique=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    #type = db.relationship("Gear_Type", backref="gear_type", lazy=True)
    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "name": self.name,
            #"type": self.type
        }
