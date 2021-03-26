from flask import request
from flask_restplus import Resource, Namespace, fields
import service.AnalysisService as AnalysisService

ns = Namespace('', description='레시피 추천 기능 API')

insert_body = ns.model(
    "Insert body",
    {
        "user_id": fields.String(description="user_id", required=True),
        "ingredients": fields.List(fields.String())
    }
)

@ns.route('/evaluation')
class recommend(Resource):
    @ns.expect(insert_body)
    def post(self):
        data = request.json
        user_id = data["user_id"]
        ingredients = data["ingredients"]

        return {"result" : AnalysisService.CF(user_id, ingredients) }