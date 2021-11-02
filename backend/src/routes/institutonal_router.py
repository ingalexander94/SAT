from flask import Blueprint
from validator.auth import InstitutionalSchema
from middleware.validate_request import required_params
from middleware.validate_token import token_required
from database.models import Institutional

instance = Institutional.Institutional()

institutional_rest = Blueprint("institutional_rest", __name__)


@institutional_rest.route("/login", methods=["POST"])
@required_params(InstitutionalSchema())
def login():
    return instance.login()

@institutional_rest.route("/record", methods=["POST"])
@token_required
def saveRecord(_):
    return instance.saveRecord() 


@institutional_rest.route("/record")
@institutional_rest.route("/record/<code>/<type>")
@token_required
def getRecords(_, code=None, type=None):
    return instance.getRecords(code, type)



