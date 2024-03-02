from flask import Blueprint, request
from flask_jwt_extended import current_user, jwt_required
from marshmallow import ValidationError

from flask_jwt_extended import current_user
from backend.lib.auth import permissions
from backend.models import Role
from backend.lib.group import create_students_group
from backend.utils import success_response


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
