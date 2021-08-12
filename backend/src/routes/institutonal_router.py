from flask import Blueprint
from validator.auth import InstitutionalSchema
from middleware.validate_request import required_params
from database.models import Institutional

instance = Institutional.Institutional()

institutional_rest = Blueprint("institutional_rest", __name__)


@institutional_rest.route("/login", methods=["POST"])
@required_params(InstitutionalSchema())
def login():
    return instance.login()
