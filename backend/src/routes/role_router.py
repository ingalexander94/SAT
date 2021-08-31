from flask import Blueprint
from middleware.validate_token import token_required
from database.models import Role

instance = Role.Role()
role_router = Blueprint("role_router", __name__)

@role_router.route("/", methods=["POST"])
@token_required
def createRole(_):
    return instance.createRole()

@role_router.route("/")
@token_required
def listRoles(_):
    return instance.listRoles();
    
