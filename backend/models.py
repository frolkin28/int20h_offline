from enum import Enum

from backend.services.db import db


class Role(Enum):
    STUDENT = 1
    TEACHER = 2


class Active_type(Enum):
    LECTURE = "lecture"
    PRACTICE = "practice"
    LABORATORY = "laboratory"
    TEST = "test"
    EXAM = "exam"


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(128), unique=True)
    first_name = db.Column(db.String(128))
    last_name = db.Column(db.String(128))
    password = db.Column(db.String(256))
    role = db.Column(db.Enum(Role), nullable=False, default=Role.STUDENT)
    group_id = db.Column(db.Integer, db.ForeignKey("group.id"))


class TokenBlocklist(db.Model):
    __tablename__ = "token_blacklist"

    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(36), nullable=False, index=True)
    created_at = db.Column(db.DateTime, nullable=False)


class Group(db.Model):
    tablename = "group"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), unique=True, nullable=False)


class Subject(db.Model):
    tablename = "subject"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128))
    teacher_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    group_id = db.Column(db.Integer, db.ForeignKey("group.id"))


class Activity(db.Model):
    tablename = "activity"

    id = db.Column(db.Integer, primary_key=True)
    subject_id = db.Column(db.Integer, db.ForeignKey("subject.id"))
    date = db.Column(db.DateTime)
    type = db.Column(db.String)
    task_link = db.Column(db.String)


class Attendance(db.Model):
    tablename = "attendance"

    id = db.Column(db.Integer, primary_key=True)
    users_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    activity_id = db.Column(db.Integer, db.ForeignKey("activity.id"))
    mark = db.Column(db.String)
