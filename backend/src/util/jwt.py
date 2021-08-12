import datetime
import jwt
from util import environment, response

def generateToken(payload, expireIn):
    token = jwt.encode({'payload': payload, 'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=expireIn)}, environment.SECRET_JWT)  
    return token


def renewToken(current_user):
        token = generateToken(current_user, 60)
        return response.success("Identificado!!", current_user, token)