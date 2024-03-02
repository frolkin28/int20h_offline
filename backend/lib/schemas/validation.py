from marshmallow import Schema, fields

from backend.models import Role


class SignUpSchema(Schema):
    first_name = fields.Str(required=True)
    last_name = fields.Str(required=True)
    email = fields.Email(required=True)
    password = fields.Str(required=True)
    role = fields.Enum(Role, by_value=True, required=True)


class SignInSchema(Schema):
    email = fields.Email(required=True)
    password = fields.Str(required=True)
