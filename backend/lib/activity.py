from sqlalchemy.exc import IntegrityError

from backend.models import Activity, User, User, Attendance

from backend.services.db import db


def _extract_attendance(user_attendance_map: dict, user_id: int) -> dict | None:
    attendance = user_attendance_map.get(user_id)
    return (
        {
            "id": attendance.id,
            "mark": attendance.mark,
        }
        if attendance
        else None
    )


def get_activity(activity_id: int) -> dict | None:
    activity_query = Activity.query.filter(Activity.id == activity_id)

    activity = activity_query.first()
    if not (activity and activity.subject):
        return None

    group_id = activity.subject.group_id

    students = User.query.filter(User.group_id == group_id).all()
    user_attendance_map = {
        attendance.users_id: attendance for attendance in activity.attendances
    }

    return {
        "id": activity.id,
        "date": activity.date.strftime("%Y-%m-%d %H:%M:%S"),
        "type": activity.type,
        "task_link": activity.task_link,
        "subject": {
            "id": activity.subject_id,
            "name": activity.subject.name,
        },
        "attendance": [
            {
                "student": {
                    "id": student.id,
                    "first_name": student.first_name,
                    "last_name": student.last_name,
                },
                "attendance": _extract_attendance(
                    user_attendance_map,
                    student.id,
                ),
            }
            for student in students
        ],
    }


def edit_student_attendance(
    activity_id: int,
    student_id: int,
    mark: str | None,
) -> bool:
    attendance = Attendance.query.filter(
        Attendance.id == activity_id,
        Attendance.users_id == student_id,
    ).first()
    if attendance:
        attendance.mark = mark
    else:
        db.session.add(
            Attendance(
                activity_id=activity_id,
                users_id=student_id,
                mark=mark,
            )
        )
    try:
        db.session.commit()
    except IntegrityError:
        return False

    return True
