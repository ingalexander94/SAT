from marshmallow import Schema, fields
from marshmallow.validate import Length, OneOf

class InstitutionalSchema(Schema):
    code = fields.Str(required = True, validate=Length(equal=7) )
    document = fields.Str(required = True, validate=Length(min=8, max=10))
    password = fields.Str(required=True)
    role = fields.Str(required=True, validate=OneOf(["docente", "estudiante","jefe"]))
    
class AdministrativeSchema(Schema):
    document = fields.Str(required = True, validate=Length(min=8, max=10))
    password = fields.Str(required=True)
    role = fields.Str(required=True, validate=OneOf(["psicologo", "medico","trabajadorSocial", "sacerdote", "vicerrector"]))