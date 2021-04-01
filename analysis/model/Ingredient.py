from utils.database import cursor



class Ingredient:

    def getIngredients():
        sql = "select name from ingredient"
        cursor.execute(sql)
        result = cursor.fetchall()
        return result