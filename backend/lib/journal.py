from datetime import datetime
from typing import Any
from sqlalchemy.orm import joinedload
from flask import current_app
from sqlalchemy import desc

from werkzeug.datastructures import FileStorage

from backend.models import Group, Subject, User, Activity, Attendance
from backend.types import CreateSubjectPayload, t
from backend.services.db import db

# from backend.exc import (
#     LotDoesNotExist,
#     InvalidLotID,
#     LotEndedError,
#     InvalidDateError,
# )

def create_activities( activities_data: list, subject_id: int) -> None:
    
    for active in activities_data:
        new_active = Activity(

            subject_id = subject_id,
            date = active["date"],
            type = active["type"],
            # task_link if we need it

        )
        db.session.add(new_active)
    db.session.commit()


def create_subject(payload: CreateSubjectPayload, user_id : int)-> int:


    subject = Subject(
        name=payload["name"],
        teacher_id = user_id,
        group_id=payload["group_id"],
    )
    db.session.add(subject)
    db.session.commit()

    if payload["activities"]:
        create_activities(payload["activities"], subject.id)

    return subject.id


def take_subject_list(user_id: int) -> list:
    
    subjects = Subject.query\
        .join(Group, Subject.group_id == Group.id)\
        .filter(Subject.teacher_id == user_id)\
        .options(joinedload(Subject.group))\
        .all()
    
    data = []
    
    for subject in subjects:
        test_dict = {
            "subject_id": subject.id,
            "subject_name": subject.name,
            "group_name": subject.group.name
        }
        data.append(test_dict)

    return data