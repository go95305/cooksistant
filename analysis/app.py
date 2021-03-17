from flask import Flask
from config.config import DevelopmentConfig
from utils.database import db
from flask_restplus import Api

def create_app(test_config=None) :
    app = Flask(__name__)
    app.debug = True
    app.config.from_object(DevelopmentConfig)

    db.init_app(app)
    with app.app_context():
        db.create_all()

    api = Api(app, title='TEST', description='레시피 추천 기능 API')

    from view.main_views import ns
    api.add_namespace(ns)


    return app

app = create_app()

if __name__ == "__main__":
    app.run()
