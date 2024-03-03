from flask import Blueprint, request
from marshmallow import ValidationError

from backend.lib.activity import edit_student_attendance
from backend.lib.auth import permissions
from backend.lib.schemas import EditAttendanceSchema
from backend.utils import error_response, success_response
from backend.models import Role


bp = Blueprint("attendance", __name__, url_prefix="/api/attendance")


@bp.route("", methods=("PUT",))
@permissions([Role.TEACHER])
def edit_attendance():
    """
    ---
    put:
        summary: Виставити відвідування/оцінку за пару
        requestBody:
            content:
              application/json:
                schema:
                  EditAttendanceSchema
        responses:
            '200':
                content:
                    application/json:
                        schema: ResponseSchema
            '400':
                description: Помилка валідації
            '401':
                description: Користувач не авторизований
            '403':
                description: Не вистачає прав
            '409':
                description: Студент або активність не існує
        tags:
        - attendance
    """
    try:
        data = EditAttendanceSchema().load(request.get_json())
    except ValidationError as e:
        return error_response(status_code=400, errors=e.messages)

    success = edit_student_attendance(
        activity_id=data["activity_id"],
        student_id=data["student_id"],
        mark=data["mark"],
    )
    if not success:
        return error_response(status_code=409, errors={"message": "Conflict"})

    return success_response()
