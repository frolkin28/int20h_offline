from flask import Blueprint, request
from flask_jwt_extended import current_user, jwt_required
from marshmallow import ValidationError

from flask_jwt_extended import current_user
from backend.lib.auth import permissions, update_user_data
from backend.models import Role
from backend.lib.group import create_students_group
from backend.utils import success_response, error_response

from typing import cast
from backend.types import  UpdateUserload
from backend.lib.schemas import UserUpdateSchema

bp = Blueprint("users", __name__, url_prefix="/api/users")


@bp.route("/account")
@jwt_required()
def account():
    """
    ---
    get:
        summary: Отримати дані користувача
        responses:
            '200':
                content:
                    application/json:
                        schema: AccountResponse
            '401':
                description: Користувач не авторизований
        tags:
        - users
    """
    return success_response(
        data={
            "email": current_user.email,
            "first_name": current_user.first_name,
            "last_name": current_user.last_name,
            "role": current_user.role.value,
        }
    )



@bp.route("/update", methods=("PUT",))
@jwt_required()
def account_update():
    """
    ---
    put:
        summary: Редагувати персональні дані користувача
        requestBody:
            required: true
            content:
                multipart/form-data:
                    schema:
                        type: object
                        properties:
                            first_name:
                                type: string
                            last_name:
                                type: string
        responses:
            '200':
                content:
                    application/json:
                        schema: UserUpdateSchema
            '401':
                description: Користувач не авторизований
        tags:
        - users
    """

    user_id: int = current_user.id
    
    try:
        request_data = cast(
            UpdateUserload,
            UserUpdateSchema().load(
                {
                    "first_name": request.form.get("first_name"),
                    "last_name": request.form.get("last_name")
                }
            ),
        )
    except ValidationError as e:
        return error_response(status_code=400, errors=e.messages)
    
    user_id = update_user_data(request_data, user_id)

    return success_response(data={"user_id": user_id})
