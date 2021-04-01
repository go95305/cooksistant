from flask import request
from flask_restplus import Resource, Namespace, fields
import service.AnalysisService as AnalysisService
import service.TrendingService as TrendingService
import service.Ocr as Ocr
ns = Namespace('', description='레시피 추천 기능 API')

insert_body = ns.model(
    "Insert body",
    {
        "userId": fields.String(description="user_id", required=True),
        "ingredients": fields.List(fields.String())
    }
)
ocr_scan=ns.model(
    "ocr scan",
    {
        "userId":fields.String(description="user_id",required=True),
        "ocrscan":fields.String()
    }
)


@ns.route('/evaluation')
class recommend(Resource):
    @ns.expect(insert_body)
    def post(self):
        data = request.get_json()
        user_id = data["userId"]
        ingredients = data["ingredients"]
        print(ingredients)

        return {"result" : AnalysisService.CF(user_id, ingredients) }

@ns.route('/trend')
class trending(Resource):
    def get(self):
        return {"trendList":TrendingService.getTrend()}

@ns.route('/konlypy')
class ocr(Resource):
    @ns.expect(ocr_scan)
    def post(self):
        data = request.get_json()
        user_id=data["userId"]
        ocr = data['ocrscan']
        ingredients = Ocr.getIngredients(ocr)
        print(ingredients)
        return {"result" : AnalysisService.CF(user_id, ingredients) }