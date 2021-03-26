from utils.database import cursor
import pandas as pd

class Recipe:

    def getRecipeDFById():
        # recipeIds_str = [str(int) for int in recipeIds]
        # recipeIds_str = ",".join(recipeIds_str)

        sql = "select id, cuisine from recipe"
        cursor.execute(sql)
        result = cursor.fetchall()

        return pd.DataFrame(result)


    def getRecipeByIngredient(ingredients):
        size = len(ingredients)
        ingredients_str = "\",\"".join(ingredients)

        sql = "select r.recipe_id\n" \
              "from recipe_has_ingredient r left outer join ingredient i\n" \
              "on r.ingredient_id = i.id\n" \
              f"where i.name in (\"{ingredients_str}\")\n" \
              "group by r.recipe_id\n" \
              f"having count(r.recipe_id) = {size};"

        cursor.execute(sql)
        result = [item['recipe_id'] for item in cursor.fetchall()]

        return result