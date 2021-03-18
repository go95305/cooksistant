from utils.database import db
from sqlalchemy_serializer import SerializerMixin

class User(db.Model, SerializerMixin):
    __tablename__ = 'user'

    id = db.Column(db.BigInteger, primary_key=True, nullable=False, autoincrement=True)
    auth_key = db.Column(db.String(255, 'utf8mb4_unicode_ci'))
    nickname = db.Column(db.String(255, 'utf8mb4_unicode_ci'))
    bitterness = db.Column(db.BigInteger)
    saltiness = db.Column(db.BigInteger)
    sourness = db.Column(db.BigInteger)
    spiciness = db.Column(db.BigInteger)
    sweetness = db.Column(db.BigInteger)