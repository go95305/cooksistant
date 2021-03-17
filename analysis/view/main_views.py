from flask import Blueprint
from flask_restplus import Resource, Api
from service.UserService import UserService

bp = Blueprint('main', __name__, url_prefix='/')

@bp.route('/get/<id>')
def get(id):
    return UserService.getUser(id).to_dict()



