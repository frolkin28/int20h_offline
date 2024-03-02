from flask import Blueprint, request

from backend.lib.student import get_students_list
from backend.utils import error_response, success_response

bp = Blueprint("students", __name__, url_prefix="/api/students")


@bp.route("")
def students_list():
    """
    ---
    get:
        summary: Список студентів (по групам)
        parameters:
            - name: group
              in: query
              description: ID групи
              required: false
              schema:
                    type: string
        responses:
            '200':
                content:
                    application/json:
                        schema: AccountResponse
            '401':
                description: Користувач не авторизований
        tags:
        - students
    """
    group_id = None
    if group_id_raw := request.args.get("group", None):
        try:
            group_id = int(group_id_raw)
        except (TypeError, ValueError):
            return error_response(
                status_code=400,
                errors={"message": "Invalid group"},
            )
    students = get_students_list(group_id)
    return success_response(
        data=[
            {
                "id": student.id,
                "email": student.email,
                "first_name": student.first_name,
                "last_name": student.last_name,
            }
            for student in students
        ]
    )
