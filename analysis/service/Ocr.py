from konlpy.tag import Kkma
from model.Ingredient import Ingredient
import pandas as pd
def getIngredients(ocr):
    # okt=konlpy.tag.Okt()
    kkma = Kkma()
    #ocr로 스캔한 문자열에서 명사를 추출한다.
    ocr_couldbe_ingredients=kkma.nouns(ocr)
    print(ocr_couldbe_ingredients)
    #전체 재료를 가져온다.
    all_ingredients = Ingredient.getIngredients()
    array_ingredients=[]
    for item in all_ingredients:
        array_ingredients.append(item['name'])
    
    
    #추출한 명사가 전체 재료에 있으면 재료리스트에 추가
    ingredients =[]
    for item in ocr_couldbe_ingredients:
        for ing in array_ingredients:
            exist = item.find(ing)
            if exist !=-1:
                if ing not in ingredients:
                    ingredients.append(ing)
    
    return ingredients