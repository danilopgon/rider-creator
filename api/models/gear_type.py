from utils.db import db


class Gear_Type(db.Model):
    __tablename__ = "gear_type"
    id = db.Column(db.Integer, primary_key=True, unique=True)
    type = db.Column(db.String(255), nullable=False)
    size = db.Column(db.String(255), nullable=False)

    def serialize(self):
        return {"id": self.id, "type": self.type, "size": self.size}
