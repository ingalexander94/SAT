from marshmallow import fields, Schema
from marshmallow.validate import OneOf, Length

class MeetSchema(Schema):
    role = fields.Str(required=True, validate=OneOf(["psicologo", "medico","trabajadorSocial", "sacerdote"]))
    date = fields.Date(required=True)
    dateFormat = fields.Str(required=True)
    ubication = fields.Str(required=True)
    student = fields.Dict(required=True)
    attendance = fields.Bool(required=True)
    state = fields.Str(required=True)
    postulation = fields.Str(required=True, validate=Length(equal=24))