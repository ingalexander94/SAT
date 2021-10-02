from flask import Blueprint
from middleware.validate_token import token_required
from database.models import Activity


instance = Activity.Activity()
activity_router = Blueprint("activity_router", __name__)

@activity_router.route("/", methods=["POST"])
def createActivity():
    return instance.createActivity()

@activity_router.route("/")
def listRoles():
    return instance.listActivities();

@activity_router.route("/activities-student")
@token_required
def listActivitiesStundent(student):
    return instance.listActivitiesStudente(student["codigo"]);

