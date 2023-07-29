from utils.db import db


class Musician(db.Model):
    __tablename__ = "musician"
    id = db.Column(db.Integer, primary_key=True, unique=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    #bands = db.relationship("Band", backref="musician", lazy=True, secondary="Band_Members")
    active_role = db.Column(db.Boolean, nullable=False, default=False)
