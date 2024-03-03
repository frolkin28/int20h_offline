from typing import cast
from backend.lib.auth import permissions
from backend.utils import error_response, success_response

from flask import Blueprint, request
from marshmallow import ValidationError
from flask_jwt_extended import current_user

from backend.lib.schemas import CreateSubjectSchema

from backend.models import User, Role
from backend.types import CreateSubjectPayload

from backend.lib.journal import create_subject, take_subject_list, get_activites



bp = Blueprint("journal", __name__, url_prefix="/api/journal")


@bp.route("/", methods=("POST",))
@permissions([Role.TEACHER])
def add_subject():
    """
    ---
    post:
        summary: Додати предмет
        requestBody:
            required: true
            content:
                multipart/form-data:
                    schema:
                        type: object
                        properties:
                            name:
                                type: string
                            group_id:
                                type: integer
                            activities:
                                type: list
        responses:
            '200':
                content:
                    application/json:
                        schema: UpsertSubjectSuccessResponse
            '400':
                content:
                    application/json:
                        schema: UpsertSubjectErrorResponse
            '401':
                description: Користувач не авторизований
        tags:
        - journal
    """
    user_id: int = current_user.id

    try:
        request_data = cast(
            CreateSubjectPayload,
            CreateSubjectSchema().load(
                {
                    "name": request.form.get("name"),
                    "group_id": request.form.get("group_id"),
                    "activities": request.form.get("activities"),
                }
            ),
        )
    except ValidationError as e:
        return error_response(status_code=400, errors=e.messages)

    subject_id = create_subject(request_data, user_id)

    return success_response(data={"subject_id": subject_id})


@bp.route("/", methods=("GET",))
@permissions([Role.TEACHER])
def my_subjects():
    """
    ---
    get:
        summary: Список предметів викладача
        responses:
            '200':
                content:
                    application/json:
                        schema: SubjectGroupShcema
            '400':
                content:
                    application/json:
                        schema: UpsertSubjectErrorResponse
            '401':
                description: Користувач не авторизований
        tags:
        - journal
    """
    user_id: int = current_user.id

    try:
        subjects_list = take_subject_list(user_id)
    except ValidationError as e:
        return error_response(status_code=400, errors=e.messages)

    return success_response(data={"subject_list": subjects_list})



# FOR ALL ROLES
@bp.route("/<int:id>", methods=("GET",))
def subject_activity(id):
    """
    ---
    get:
        summary: Список завдань по конкретному предмету  
        responses: 
            '200':
                content:
                    application/json:
                        schema: SubjectActivitesShcema
            '400':
                content:
                    application/json:
                        schema: UpsertSubjectErrorResponse
            '401':
                description: Користувач не авторизований
        tags:
        - journal
    """

    try:
        activites_list = get_activites(id)
    except ValidationError as e:
        return error_response(status_code=400, errors=e.messages)

    return success_response(data={"activites_list": activites_list})