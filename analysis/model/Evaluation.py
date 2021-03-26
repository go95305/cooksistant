from utils.database import cursor
import pandas as pd

class Evaluation:

    def getEvaluationDFByRecipeId():
        # recipeIds_str = [str(int) for int in recipeIds]
        # recipeIds_str = ",".join(recipeIds_str)

        sql = "select e.user_id, e.recipe_id, r.cuisine, e.favor " \
              "from recipe r inner join evaluation e on(r.id=e.recipe_id)"
        cursor.execute(sql)
        result = cursor.fetchall()

        return pd.DataFrame(result)
