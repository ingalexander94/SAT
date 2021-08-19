from marshmallow import Schema, fields
from marshmallow.validate import Length

class SuggestionSchema(Schema):
    codeStudent = fields.Str(required=True, validate=Length(equal=7))
    idProfit = fields.Str(required=True, validate=Length(equal=24))
    date = fields.DateTime(required=True)
    
    