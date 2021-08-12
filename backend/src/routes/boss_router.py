from flask import Blueprint
from database.models import Institutional, Postulation
from validator.program import ProgramSchema
from validator.postulation import UpdateSchema
from middleware.validate_token import token_required
from middleware.validate_request import required_params

boss_rest = Blueprint("boss_rest", __name__)
instanceInstitutional = Institutional.Institutional()
instancePostulation = Postulation.Postulation()


@boss_rest.route("/semesters/students", methods=["POST"])
@token_required
@required_params(ProgramSchema())
def studentsOfPeriod(_):
    return instanceInstitutional.studentsOfPeriod()


@boss_rest.route("/postulation/update", methods=["PUT"])
@token_required
@required_params(UpdateSchema())
def updatePostulation(_):
    return instancePostulation.updatePostulationByBoss()
