from marshmallow import fields, Schema
from marshmallow.validate import Length

class RolSchema(Schema):
    role = fields.Str(required=True, validate= Length(min=4))