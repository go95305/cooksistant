from utils.database import cursor
import pandas as pd


class Recipe:
    def getRecipeByFavor():
        sql = "select recipe_id,count(recipe_id) "\
            "from evaluation "\
            "group by recipe_id "\
            "order by count(recipe_id) desc"
        cursor.execute(sql)
        result = cursor.fetchall()
        return pd.DataFrame(result)

    def getRecipe():
        sql = "select id, cuisine from recipe"
        cursor.execute(sql)
        result = cursor.fetchall()

        return pd.DataFrame(result)

    def getRecipeByIngredient(ingredients):
        size = len(ingredients)
        ingredients_str = "\",\"".join(ingredients)

        sql = "select distinct(r.recipe_id)\n" \
              "from recipe_has_ingredient r left outer join ingredient i\n" \
              "on r.ingredient_id = i.id\n" \
              f"where i.name in (\"{ingredients_str}\")\n" \
              "group by r.recipe_id"

        cursor.execute(sql)
        result = [item['recipe_id'] for item in cursor.fetchall()]

        return result
