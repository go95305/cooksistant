from utils.database import cursor
import pandas as pd


class Evaluation:

    def getEvaluation():

        # 여기에 keyword도 포함해야하지않나?
        sql = "select e.user_id, e.recipe_id, r.cuisine, e.favor " \
              "from recipe r inner join evaluation e on(r.id=e.recipe_id)"
        cursor.execute(sql)
        result = cursor.fetchall()

        return pd.DataFrame(result)

    def getCBFDataFrame():
        sql = "select b.recipe_id,group_concat(keyword separator ' ') as keyword,avg(b.favor) as favor_average,count(b.evaluation_id) as count "\
            "from (select r.id as recipe_id, evk.id as evaluation_id, evk.keyword,evk.favor "\
            "from recipe r left outer join(select ev.recipe_id,ev.id,ek.keyword,ev.favor "\
            "from evaluation ev left outer join (select e.evaluation_id, k.keyword "\
            "from evaluation_has_keyword e inner join keyword k "\
            "on(e.keyword_id=k.id)) ek "\
            "on(ev.id=ek.evaluation_id)) evk "\
            "on(r.id = evk.recipe_id)) as b "\
            "where b.favor is not null "\
            "group by b.recipe_id"
           

        cursor.execute(sql)
        result = cursor.fetchall()
        return pd.DataFrame(result)