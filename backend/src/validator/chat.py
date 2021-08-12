from marshmallow import Schema, fields
from marshmallow.validate import Length
class ChatSchema(Schema):
    message = fields.Str(required=True)
    date = fields.DateTime(required=True)
    receiver = fields.Dict(required=True)
    
class ReceiverSchema(Schema):
    code = fields.Str(required = True, validate=Length(min=7) )
    email = fields.Email(required=True)
    name = fields.Str(required=True)