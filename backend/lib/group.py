from sqlalchemy.exc import IntegrityError

from backend.services.db import db
from backend.models import Group


def create_students_group(name: str) -> bool:
    db.session.add(Group(name=name))
    try:
        db.session.commit()
    except IntegrityError:
        return False
    return True


def get_groups() -> list[Group]:
    return Group.query.all()
