from flask_restplus import Resource, Namespace
from service.UserService import UserService
from service.RecipeService import RecipeService
from service.EvaluationService import EvaluationService

ns = Namespace('test', description='레시피 추천 기능 API')

@ns.route('/evaluation/<id>')
class test(Resource):
    def get(self, id):
         return EvaluationService.getEvaluation(id)



