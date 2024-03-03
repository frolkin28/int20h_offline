from sqlalchemy.exc import IntegrityError
from sqlalchemy import and_

from backend.models import Activity, User, Attendance, Subject, Role
from flask import current_app
from backend.services.db import db
from backend.services.mail_service import mail
from backend.types import  loadMailtemplate
from backend.exc import MessageNotsent

from flask_mail import Message


def create_message(request_message:loadMailtemplate):
    if request_message["target"] == 0:
        students = User.query.filter(User.role == Role.STUDENT).all()
    else:
        students = User.query.filter(and_(User.role == Role.STUDENT, User.group_id == request_message["target"])).all()


    send_email(students, request_message["text"])


def send_email(students:list, text:str)-> None:

    for student in students:

        theme = 'Campus'
        body = text 
        message = Message(subject=theme, body=body, sender=current_app.config['MAIL_USERNAME'], recipients=[student.email])

        with current_app.app_context():
            mail.send(message)
