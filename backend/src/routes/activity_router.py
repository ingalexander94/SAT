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
    return instance.listActivitiesStudent(student["codigo"]);

@activity_router.route("/asist", methods=["POST"])
@token_required
def asistActivity(student):
    return instance.asistActivity(student["codigo"])

@activity_router.route("/asist/<code>")
@activity_router.route("/asist/")
@token_required
def getActivitysAsist(_, code=None):
    return instance.getActivitysAsist(code)
