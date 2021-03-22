from utils.database import db
from sqlalchemy_serializer import SerializerMixin

class Recipe(db.Model, SerializerMixin):
    __tablename__ = 'recipe'

    id = db.Column(db.BigInteger, primary_key=True, nullable=False, autoincrement=True)
    user_id = db.Column(db.BigInteger, db.ForeignKey('user.id'))
    cuisine = db.Column(db.String(255, 'utf8mb4_unicode_ci'))
    description = db.Column(db.String())
    cooking_time = db.Column(db.String(255, 'utf8mb4_unicode_ci'))
    level = db.Column(db.String(255, 'utf8mb4_unicode_ci'))
    serving = db.Column(db.String(255, 'utf8mb4_unicode_ci'))
    image = db.Column(db.String(255, 'utf8mb4_unicode_ci'))