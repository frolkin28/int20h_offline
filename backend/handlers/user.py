from flask import Blueprint, request
from flask_jwt_extended import current_user, jwt_required
from marshmallow import ValidationError

from flask_jwt_extended import current_user
from backend.lib.auth import permissions
from backend.models import Role
from backend.lib.group import create_students_group
from backend.utils import success_response


bp = Blueprint("users", __name__, url_prefix="/api/users")


@bp.route("", methods=("POST",))
@jwt_required()
def user():

    return success_response(
        data={
            "email": current_user.email,
        }
    )
