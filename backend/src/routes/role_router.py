from flask import Blueprint
from middleware.validate_request import required_params
from middleware.validate_token import token_required
from database.models import Role
from validator.role import RolSchema

instance = Role.Role()
role_router = Blueprint("role_router", __name__)

@role_router.route("/", methods=["POST"])
@token_required
@required_params(RolSchema())
def createRole(_):
    return instance.createRole()

@role_router.route("/")
def listRoles():
    return instance.listRoles();
    
