from marshmallow import Schema, fields

from backend.lib.schemas.validation import (
    SignUpSchema,
    SignInSchema,
)


def errors_field(schema: Schema) -> fields.Nested:
    fields_names: tuple[str, ...] = tuple(schema().fields.keys())

    return fields.Nested(
        Schema.from_dict(
            {field: fields.Str() for field in fields_names},
        ),
        allow_none=True,
    )


class ResponseSchema(Schema):
    success = fields.Bool(required=True)


class UserTokenSchema(Schema):
    user_id = fields.Int(required=True)
    access_token = fields.Str(required=True)


class AuthSuccessResponse(ResponseSchema):
    data = fields.Nested(UserTokenSchema)


class SignInErrorResponse(ResponseSchema):
    errors = errors_field(SignInSchema)


class SignUpErrorResponse(ResponseSchema):
    errors = errors_field(SignUpSchema)


class ErrorMessageSchema(Schema):
    message = fields.Str(required=True)


class ErrorMessageResponse(ResponseSchema):
    errors = fields.Nested(ErrorMessageSchema)


class SubjectIdSchema(Schema):
    lot_id = fields.Int(required=True)


class UpsertSubjectSuccessResponse(ResponseSchema):
    data = fields.Nested(SubjectIdSchema)


class UpsertSubjectErrorResponse(ResponseSchema):
    errors = errors_field(SubjectIdSchema)


class UserSchema(Schema):
    email = fields.Email(required=True)
    first_name = fields.Str(required=True)
    last_name = fields.Str(required=True)
    role = fields.Int(required=True)


class AccountResponse(ResponseSchema):
    data = fields.Nested(UserSchema)


class ActivitySchema(Schema):
    id = fields.Int(required=True)


class StuduntAttendanceSchema(Schema):
    id = fields.Int(required=True)
    first_name = fields.Str(required=True)
    last_name = fields.Str(required=True)


class MarkSchema(Schema):
    id = fields.Int(required=True)
    mark = fields.Str()


class AttendanceSchema(Schema):
    student = fields.Nested(StuduntAttendanceSchema)
    attendance = fields.Nested(MarkSchema)


class SubjectActivitySchema(Schema):
    id = fields.Int(required=True)
    name = fields.Str(required=True)


class ActivitySchema(Schema):
    id = fields.Int(required=True)
    date = fields.Str(required=True)
    type = fields.Str(required=True)
    task_link = fields.Str(required=False)
    subject = fields.Nested(SubjectActivitySchema)
    attendance = fields.List(fields.Nested(AttendanceSchema))


class ActivityResponse(ResponseSchema):
    data = fields.Nested(ActivitySchema)


class GroupSchema(Schema):
    id = fields.Int(required=True)
    name = fields.Str(required=False)


class GroupsListResponse(ResponseSchema):
    data = fields.List(fields.Nested(GroupSchema))
