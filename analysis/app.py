from flask import Flask
from flask_restplus import Api

def create_app(test_config=None) :
    app = Flask(__name__)
    app.debug = True

    api = Api(app, title='TEST', description='레시피 추천 기능 API')

    from view.main_views import ns
    api.add_namespace(ns)

    return app

app = create_app()

if __name__ == "__main__":
    app.run()
