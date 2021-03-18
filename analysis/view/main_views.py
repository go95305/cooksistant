from flask_restplus import Resource, Namespace
from service.UserService import UserService

ns = Namespace('test', description='레시피 추천 기능 API')

@ns.route('/user/<id>')
class HelloWorld(Resource):
    def get(self, id):
         return UserService.getUser(id)



