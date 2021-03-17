from model.User import User

class UserService:

    def getUser(id):
        return User.query.get(id).to_dict()