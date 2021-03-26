from flask import Flask
from flask_restplus import Api

def create_app(test_config=None) :
    app = Flask(__name__)
    app.debug = True

    #Swagger 대 제목
    api = Api(app, title='Recommend(Data Analysis)', description='레시피 추천 기능 API')

    from view.main_views import ns
    api.add_namespace(ns)

    return app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True,host="0.0.0.0")
