from flask import Flask
from flask_restplus import Resource, Api
app = Flask(__name__)
api = Api(app)
ns = api.namespace('TEST', description='레시피 추천 기능 API')


@ns.route('/hello/<string:name>')
class HelloWorld(Resource):
    def get(self,name):
         return {"message": "welcome, %s!" % name}


if __name__ == "__main__":
    app.run(debug=True)
