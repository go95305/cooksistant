from flask import Flask
from config.config import DevelopmentConfig
from utils.database import db
from flask_restplus import Resource, Api


def create_app(test_config=None) :
    app = Flask(__name__)
    app.debug = True
    app.config.from_object(DevelopmentConfig)

    db.init_app(app)
    with app.app_context():
        db.create_all()

    from view import main_views
    app.register_blueprint(main_views.bp)

    api = Api(app, title='TEST', description='레시피 추천 기능 API')

    return app

app = create_app()

if __name__ == "__main__":
    app.run()
