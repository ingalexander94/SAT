from flask import Blueprint
from validator.auth import AdministrativeSchema
from middleware.validate_token import token_required
from middleware.validate_request import required_params
from database.models import Administrative

instance = Administrative.Administrative()

administrative_rest = Blueprint("administrative_rest", __name__)    

@administrative_rest.route("/login", methods=["POST"])
@required_params(AdministrativeSchema())
def login():
    return instance.login()





