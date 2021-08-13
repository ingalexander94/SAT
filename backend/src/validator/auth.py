from marshmallow import Schema, fields
from marshmallow.validate import Length, OneOf

class InstitutionalSchema(Schema):
    code = fields.Str(required = True, validate=Length(equal=7) )
    document = fields.Str(required = True, validate=Length(min=8, max=10))
    password = fields.Str(required=True)
    role = fields.Str(required=True, validate=OneOf(["docente", "estudiante","jefe"]))
    
class AdministrativeSchema(Schema):
    document = fields.Str(required = True, validate=Length(min=8, max=10))
    password = fields.Str(required = True)
    role = fields.Str(required = True, validate=OneOf(["psicologo", "medico","trabajadorSocial", "sacerdote", "vicerrector"]))
    
class Administrative2Schema(Schema):
    nombre = fields.Str(required = True)
    apellido = fields.Str(required = True)
    documento = fields.Str(required = True, validate=Length(min=8, max=10))
    rol = fields.Str(required=True, validate=OneOf(["psicologo", "medico","trabajadorSocial", "sacerdote", "vicerrector"]))
    telefono = fields.Str(required = True, validate=Length(min=7, max=15))
    correo = fields.Email(required = True)
    
class ChangePasswordSchema(Schema):
    password = fields.Str(required = True)
    newPassword = fields.Str(required = True, validate=Length(min=4))
    id = fields.Str(required=True, validate=Length(equal=24))
    
class EmailRecoverySchema(Schema):
    email = fields.Email(required=True)
    
class RecoveryPasswordSchema(Schema):
    newPassword = fields.Str(required = True, validate=Length(min=4))