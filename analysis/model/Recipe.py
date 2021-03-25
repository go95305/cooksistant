from utils.database import db
from sqlalchemy.orm import relationship
from sqlalchemy_serializer import SerializerMixin

association_table = db.Table('recipe_has_ingredient', db.metadata,
    db.Column('recipe_id', db.Integer, db.ForeignKey('recipe.id')),
    db.Column('ingredient_id', db.Integer, db.ForeignKey('ingredient.id'))
)

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
    ingredients = relationship("Ingredient",
                               secondary=association_table)

class Ingredient(db.Model, SerializerMixin):
    __tablename__ = 'ingredient'

    id = db.Column(db.BigInteger, primary_key=True, nullable=False, autoincrement=True)
    name = db.Column(db.String(255, 'utf8mb4_unicode_ci'))