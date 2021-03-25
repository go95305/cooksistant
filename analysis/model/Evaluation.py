from utils.database import cursor
import pandas as pd

class Evaluation:

    def getEvaluationDFByRecipeId(recipeIds):
        recipeIds_str = [str(int) for int in recipeIds]
        recipeIds_str = ",".join(recipeIds_str)

        sql = "select user_id, recipe_id, favor " \
              f"from evaluation where recipe_id in ({recipeIds_str})"
        cursor.execute(sql)
        result = cursor.fetchall()

        return pd.DataFrame(result)
