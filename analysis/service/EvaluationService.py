from model.Evaluation import Evaluation

class EvaluationService:

    def getEvaluation(id):
        return Evaluation.query.get(id).to_dict()