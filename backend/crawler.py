import requests
from bs4 import BeautifulSoup
import pymysql
import sys

def main():
    db = pymysql.connect(
        user = 'root',
        passwd='root',
        host='j4c101.p.ssafy.io',
        db='cookssistant',
        charset='utf8'
    )
    cursor = db.cursor(pymysql.cursors.DictCursor)


    baseURL = 'https://www.10000recipe.com/recipe/list.html?q=%EC%9E%90%EC%B7%A8&order=reco&page='
    subURL = "https://www.10000recipe.com"

    for i in range(1, 26) :
        response = requests.get(baseURL + str(i))

        if response.status_code == 200:
            html = response.text
            soup = BeautifulSoup(html, 'html.parser')
            li_list = soup.select("#contents_area_full > ul > ul > li")

            for li in li_list:
                recipe = li.a['href']
                response = requests.get(subURL + recipe)

                try :
                    if response.status_code == 200:
                        html = response.text
                        soup = BeautifulSoup(html, 'html.parser')

                        # ----- recipe -----
                        cuisine = soup.select_one("#contents_area > div.view2_summary.st3 > h3").text
                        cuisine = cuisine.replace('"', '\'')

                        description = soup.select_one("#recipeIntro")
                        if description != None :
                            description = description.text.lstrip().rstrip().replace('"', '\'')


                        serving = ''
                        cooking_time = ''
                        level = ''

                        if soup.select_one("#contents_area > div.view2_summary.st3 > div.view2_summary_info").text.replace("\n", '') != '':
                            serving = soup.select_one("#contents_area > div.view2_summary.st3 > div.view2_summary_info > span.view2_summary_info1").text
                            cooking_time = soup.select_one("#contents_area > div.view2_summary.st3 > div.view2_summary_info > span.view2_summary_info2").text
                            level = soup.select_one("#contents_area > div.view2_summary.st3 > div.view2_summary_info > span.view2_summary_info3").text
                        image = soup.select_one("#main_thumbs")['src']

                        sql = "INSERT INTO recipe (user_id, cuisine, description, serving, cooking_time, level, image) values(1, \"{cui}\", \"{desc}\", \"{serv}\", \"{time}\", \"{level}\", \"{img}\")"\
                            .format(cui=cuisine, desc=description, serv=serving, time=cooking_time, level=level, img=image)
                        cursor.execute(sql)

                        cursor.execute("select id from recipe where cuisine = \"{cuisine}\"".format(cuisine=cuisine))
                        result = cursor.fetchone()
                        recipe_id = result['id']

                        # ----- ingredient -----
                        type = ""

                        top = soup.select("#divConfirmedMaterialArea > ul")
                        for ul in top:
                            type = ul.select_one(".ready_ingre3_tt").text
                            for a in ul.select("a"):
                                tmp = a.select_one("li").text.split('\n')
                                name = tmp[0].rstrip()
                                amount = tmp[1]

                                cursor.execute("select id from ingredient where name = \"{name}\"".format(name=name))
                                result = cursor.fetchone()
                                if result == None:
                                    cursor.execute("insert into ingredient (name) values (\"{name}\")".format(name=name))
                                    cursor.execute("select id from ingredient where name = \"{name}\"".format(name=name))
                                    result = cursor.fetchone()

                                ingre_id = result["id"]
                                cursor.execute("insert into recipe_has_ingredient(recipe_id, ingredient_id, amount, type) values({rid}, {iid}, \"{amount}\", \"{type}\")"
                                               .format(rid=recipe_id, iid=ingre_id, amount=amount, type=type))

                        # ----- step -----
                        idx = 1
                        while True :
                            selector = "#stepDiv" + str(idx)
                            div = soup.select(selector)

                            if not div: break

                            desc = soup.select_one("#stepdescr" + str(idx)).text
                            img = soup.select_one("#stepimg" + str(idx) + "> img")
                            if img : img = img['src']

                            cursor.execute("insert into step(recipe_id, description, image, level) values({rid}, \"{desc}\", \"{img}\", {level})"
                                           .format(rid=recipe_id, desc=desc, img=img, level=idx))

                            idx +=1

                    db.commit()
                except:
                    db.rollback()
                    print("Unexpected error:", sys.exc_info()[0])
                    print(subURL + recipe)

if __name__ == "__main__":
    main()
