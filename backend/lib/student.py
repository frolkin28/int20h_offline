from backend.models import User, Role


def get_students_list(group_id: int | None) -> list[User]:
    query = User.query.filter(User.role == Role.STUDENT)
    if group_id:
        query = query.filter(User.group_id == group_id)
    return query.all()
