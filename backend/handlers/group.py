from flask import Blueprint, request
from marshmallow import ValidationError

from backend.lib.auth import permissions
from backend.models import Role
from backend.lib.group import create_students_group, get_groups
from backend.lib.schemas.validation import CreateGroupSchema
from backend.utils import error_response, success_response


bp = Blueprint("groups", __name__, url_prefix="/api/groups")


@bp.route("", methods=("POST",))
@permissions([Role.TEACHER])
def create_group():
    """
    ---
    post:
        summary: Створення групи
        requestBody:
            content:
              application/json:
                schema:
                  CreateGroupSchema
        responses:
            '200':
                content:
                    application/json:
                        schema: ResponseSchema
            '400':
                content:
                    application/json:
                        schema: ErrorMessageResponse
            '401':
                description: Користувач не авторизований
            '403':
                description: Не вистачає прав
        tags:
        - group
    """
    try:
        request_data = CreateGroupSchema().load(request.get_json())
    except ValidationError as e:
        return error_response(status_code=400, errors=e.messages)
    created = create_students_group(request_data["name"])
    if not created:
        return error_response(
            status_code=400, errors={"message": "Group already exists"}
        )

    return success_response()


@bp.route("", methods=("GET",))
def groups_list():
    """
    ---
    get:
        summary: Список груп
        responses:
            '200':
                content:
                    application/json:
                        schema: GroupsListResponse
        tags:
        - group
    """
    groups = get_groups()

    return success_response(
        data=[
            {
                "id": group.id,
                "name": group.name,
            }
            for group in groups
        ]
    )
