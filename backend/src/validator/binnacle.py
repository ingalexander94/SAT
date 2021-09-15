from marshmallow import fields, Schema
from marshmallow.validate import Length, OneOf

class BinnacleSchema(Schema):
    text = fields.Str(required=True)
    student = fields.Str(required=True, validate=Length(equal=7))
    role = fields.Str(required=True, validate=OneOf(["psicologo", "medico","trabajadorSocial", "sacerdote", "vicerrector"]))
    date = fields.DateTime(required=True)
    
