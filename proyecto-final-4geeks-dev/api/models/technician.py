from utils.db import db


class Technician(db.Model):
    __tablename__ = "technician"
    id = db.Column(db.Integer, primary_key=True, unique=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    city = db.Column(db.String(255))
    is_available = db.Column(db.Boolean, nullable=False, default=False)
    active_role = db.Column(db.Boolean, nullable=False, default=False)
