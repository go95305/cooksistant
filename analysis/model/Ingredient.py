from utils.database import cursor,db



class Ingredient:

    def getIngredients():
        sql = "select name from ingredient"
        db.ping(reconnect=True)
        cursor.execute(sql)
        result = cursor.fetchall()
        return result