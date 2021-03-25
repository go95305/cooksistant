from model.Evaluation import Evaluation
from model.Recipe import Recipe

from sklearn.decomposition import TruncatedSVD
from scipy.sparse.linalg import svds

import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd
import numpy as np
import warnings
warnings.filterwarnings("ignore")


def CF(user_id, ingredients):
    recipeIds = Recipe.getRecipeByIngredient(ingredients)

    df_recipe = Recipe.getRecipeDFById(recipeIds)
    df_rating = Evaluation.getEvaluationDFByRecipeId(recipeIds)

    user_recipe_data = pd.merge(df_rating, df_recipe, left_on='recipe_id', right_on='id')
    user_recipe_rating = user_recipe_data.pivot_table('favor', index='user_id', columns='recipe_id').fillna(0)

    matrix = user_recipe_rating.values
    user_rating_mean = np.mean(matrix, axis=1)
    matrix_user_mean = matrix - user_rating_mean.reshape(-1, 1)

    U, sigma, Vt = svds(matrix_user_mean, k=2)
    sigma = np.diag(sigma)
    svd_user_predicted_ratings = np.dot(np.dot(U, sigma), Vt) + user_rating_mean.reshape(-1, 1)
    df_svd_preds = pd.DataFrame(svd_user_predicted_ratings, columns=user_recipe_rating.columns)

    already_rated, predictions = recommend_movies(df_svd_preds, 2, df_recipe, df_rating, 10)

    return predictions["id"].tolist()

def recommend_movies(df_svd_preds, user_id, ori_recipe_df, ori_ratings_df, num_recommendations=5):
    # 현재는 index로 적용이 되어있으므로 user_id - 1을 해야함.
    user_row_number = user_id - 1

    # 최종적으로 만든 pred_df에서 사용자 index에 따라 영화 데이터 정렬 -> 영화 평점이 높은 순으로 정렬 됌
    sorted_user_predictions = df_svd_preds.iloc[user_row_number].sort_values(ascending=False)

    # 원본 평점 데이터에서 user id에 해당하는 데이터를 뽑아낸다.
    user_data = ori_ratings_df[ori_ratings_df.user_id == user_id]

    # 위에서 뽑은 user_data와 원본 영화 데이터를 합친다.
    user_history = user_data.merge(ori_recipe_df, left_on='recipe_id', right_on='id').sort_values(['favor'], ascending=False)

    # 원본 영화 데이터에서 사용자가 본 영화 데이터를 제외한 데이터를 추출
    recommendations = ori_recipe_df[~ori_recipe_df['id'].isin(user_history['recipe_id'])]
    # 사용자의 영화 평점이 높은 순으로 정렬된 데이터와 위 recommendations을 합친다.
    recommendations = recommendations.merge(pd.DataFrame(sorted_user_predictions).reset_index(), left_on='id', right_on='recipe_id')
    # 컬럼 이름 바꾸고 정렬해서 return
    recommendations = recommendations.rename(columns={user_row_number: 'Predictions'}).sort_values('Predictions',
                                                                                                       ascending=False).iloc[
                        :num_recommendations, :]

    return user_history, recommendations

