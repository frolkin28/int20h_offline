from marshmallow import Schema, fields


class SignUpSchema(Schema):
    first_name = fields.Str(required=True)
    last_name = fields.Str(required=True)
    email = fields.Email(required=True)
    password = fields.Str(required=True)


class SignInSchema(Schema):
    email = fields.Email(required=True)
    password = fields.Str(required=True)
