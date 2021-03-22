from model.Recipe import Recipe

class RecipeService:

    def getRecipe(id):
        return Recipe.query.get(id).to_dict()