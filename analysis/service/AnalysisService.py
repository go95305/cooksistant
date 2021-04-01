from model.Evaluation import Evaluation
from model.Recipe import Recipe

from sklearn.decomposition import TruncatedSVD
from scipy.sparse.linalg import svds
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd
import numpy as np
import warnings
warnings.filterwarnings("ignore")


def CF(user_id, ingredients):

    df_recipe = Recipe.getRecipe()  # 전체 레시피 가져오기
    df_rating = Evaluation.getEvaluation()  # 전체 레시피 평가 데이터 가져오기

    # 협업 필터링 과정
    user_recipe_rating = df_rating.pivot_table(
        'favor', index='user_id', columns='recipe_id').fillna(0)
    matrix = user_recipe_rating.values
    user_rating_mean = np.mean(matrix, axis=1)
    matrix_user_mean = matrix - user_rating_mean.reshape(-1, 1)
    U, sigma, Vt = svds(matrix_user_mean, k=12)
    sigma = np.diag(sigma)
    svd_user_predicted_ratings = np.dot(
        np.dot(U, sigma), Vt) + user_rating_mean.reshape(-1, 1)
    df_svd_preds = pd.DataFrame(
        svd_user_predicted_ratings, columns=user_recipe_rating.columns)

    predictions = recommend_movies(
        df_svd_preds, user_id, df_recipe, df_rating)
    # print(predictions)
    # 협업 필터링 과정
    a=predictions.iloc[0].iloc[2]
    # print(a)
    #컨텐츠 기반  필터링 수행
    contents_filtered=CBF(a)
    #컨텐츠 기반 필터링 수행
    # print(contents_filtered)
    # 뽑아온 레시피 중에서 해당 재료가 포함됬는지
    filteredRecipeId = Recipe.getRecipeByIngredient(ingredients)
    # print(filteredRecipeId)
    # print(predictions["id"].tolist())
    cf_filtered_recipeId=[];
    cf_nfiltered_recipeId=[];
    for item in contents_filtered["recipe_id"].tolist():
        if item in filteredRecipeId:
            cf_filtered_recipeId.append(item)
            filteredRecipeId.remove(item)
    # print(cf_filtered_recipeId)
    best_recommendation = cf_filtered_recipeId+filteredRecipeId
    idx=1
    final_recommend=[]
    for item in best_recommendation:
        if idx==11:
            break
        final_recommend.append(item)
        idx=idx+1
    # print(final_recommend)
    return final_recommend


def recommend_movies(df_svd_preds, user_id, ori_recipe_df, ori_ratings_df):
    # 현재는 index로 적용이 되어있으므로 user_id - 1을 해야함.
    user_row_number = int(user_id) - 1

    # 최종적으로 만든 pred_df에서 사용자 index에 따라 영화 데이터 정렬 -> 영화 평점이 높은 순으로 정렬 됌
    sorted_user_predictions = df_svd_preds.iloc[user_row_number].sort_values(
        ascending=False)

    # 원본 평점 데이터에서 user id에 해당하는 데이터를 뽑아낸다.
    user_data = ori_ratings_df[ori_ratings_df.user_id == user_id]

    # 위에서 뽑은 user_data와 원본 영화 데이터를 합친다.
    user_history = user_data.merge(
        ori_recipe_df, left_on='recipe_id', right_on='id').sort_values(['favor'], ascending=False)

    # 원본 영화 데이터에서 사용자가 본 영화 데이터를 제외한 데이터를 추출
    recommendations = ori_recipe_df[~ori_recipe_df['id'].isin(
        user_history['recipe_id'])]
    # 사용자의 영화 평점이 높은 순으로 정렬된 데이터와 위 recommendations을 합친다.
    recommendations = recommendations.merge(pd.DataFrame(
        sorted_user_predictions).reset_index(), left_on='id', right_on='recipe_id')
    # 컬럼 이름 바꾸고 정렬해서 return
    recommendations = recommendations.rename(columns={user_row_number: 'Predictions'}).sort_values('Predictions',
                                                                                                   ascending=False)

    return recommendations

# 유저가 최근에 평가한 데이터랑 키워드가 담긴 데이터프레임으로 한다
def CBF(recipe_id_CF):
    
    dataframe = Evaluation.getCBFDataFrame()
    
    m = dataframe['count'].quantile(0.6)
    dataframe=dataframe.copy().loc[dataframe['count']>=m]
    C=dataframe['favor_average'].mean()
    v=dataframe['count']
    R=dataframe['favor_average']
    # weighted_rating = ((v/(v+m)*R)+(m/(m+v)*C))
    # print(weighted_rating)
    # dataframe['score'] = dataframe.apply(weighted_rating,axis=1)
    # print(dataframe)
    count_vector = CountVectorizer(ngram_range=(1,3))
    c_vector_keywords = count_vector.fit_transform(dataframe['keyword'])
    keyword_sim = cosine_similarity(c_vector_keywords,c_vector_keywords).argsort()[:, ::-1]
    # print(dataframe)
    recommended= get_recommend_movie_list(keyword_sim,dataframe,recipe_id=recipe_id_CF)
    # print(recommended)
    return recommended

# def weighted_rating(x,m,C):
#     v=x['count']
#     R=x['favor_average']
#     print((v/(v+m)*R)+(m/(m+v)*C))
#     return (v/(v+m)*R)+(m/(m+v)*C)

def get_recommend_movie_list(keyword_sim,df,recipe_id):
  target_recipe_index= df[df['recipe_id']==recipe_id].index.values
  # target_recipe_index = target_recipe[['user_id']].index.values
  sim_index = keyword_sim[target_recipe_index].reshape(-1)
  sim_index = sim_index[sim_index!=target_recipe_index]

  result = df.iloc[sim_index]
  return result