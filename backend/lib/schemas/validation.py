from marshmallow import Schema, fields

from backend.models import Role, Active_type


class SignUpSchema(Schema):
    first_name = fields.Str(required=True)
    last_name = fields.Str(required=True)
    email = fields.Email(required=True)
    password = fields.Str(required=True)
    role = fields.Enum(Role, by_value=True, required=True)
    group = fields.Str(description="Required for student")


class SignInSchema(Schema):
    email = fields.Email(required=True)
    password = fields.Str(required=True)


class UserUpdateSchema(Schema):
    first_name = fields.Str(required=True)
    last_name = fields.Str(required=True)


class FullSubjectSchema(Schema):
    name = fields.Str(required=True)
    teacher_id = fields.Int(required=True)
    group_id = fields.Int(required=True)


class ActivitySchema(Schema):
    type = fields.Enum(Active_type, by_value=True, required=True)
    task_link = fields.Str()
    date = fields.DateTime(required=True)


class CreateSubjectSchema(Schema):
    name = fields.Str(required=True)
    group_id = fields.Int(required=True)
    activities = fields.List(fields.Nested(ActivitySchema))


class CreateGroupSchema(Schema):
    name = fields.Str(required=True)


class SubjectGroupShcema(Schema):
    subject_id = fields.Int(required=True)
    subject_name = fields.Str(required=True)
    group_name = fields.Str(required=True)


class SubjectActivitesShcema(Schema):
    active_id = fields.Int(required=True)
    type = fields.Str(required=True)
    date = fields.DateTime(required=True)


class EditAttendanceSchema(Schema):
    activity_id = fields.Int(required=True)
    student_id = fields.Int(required=True)
    mark = fields.Str()


class mailSchema(Schema):
    target = fields.Str(required=True)
    text = fields.Str(required=True)
