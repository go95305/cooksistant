from utils.database import db
from sqlalchemy_serializer import SerializerMixin

class Evaluation(db.Model, SerializerMixin):
    __tablename__ = 'evaluation'

    id = db.Column(db.BigInteger, primary_key=True, nullable=False, autoincrement=True)
    recipe_id = db.Column(db.BigInteger, db.ForeignKey('recipe.id'))
    user_id = db.Column(db.BigInteger, db.ForeignKey('user.id'))
    favor = db.Column(db.Float)
    is_complete = db.Column(db.Boolean)
    is_sampled = db.Column(db.Boolean)