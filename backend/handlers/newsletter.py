from flask import Blueprint, request
from typing import cast
from backend.lib.newsletter import create_message
from backend.utils import success_response, error_response
from flask_jwt_extended import jwt_required
from marshmallow import ValidationError
from backend.exc import MessageNotsent

bp = Blueprint("newsletter", __name__, url_prefix="/api/newsletter")

from backend.types import loadMailtemplate
from backend.lib.schemas import mailSchema


@bp.route("", methods=("POST",))
@jwt_required()
def news():
    """
    ---
    get:
        summary: Надіслати повідомлення
        requestBody:
            required: true
            content:
                multipart/form-data:
                    schema:
                        type: object
                        properties:
                            target:
                                type: int
                            text:
                                type: str
        responses:
            '200':
                description: Успіх
            '400':
                description: Помилка валідації
        tags:
        - newsletter
    """
    try:
        request_message = cast(
            loadMailtemplate,
            mailSchema().load(request.get_json()),
        )
    except ValidationError as e:
        return error_response(status_code=400, errors=e.messages)

    try:
        create_message(request_message)
    except MessageNotsent:
        return error_response(status_code=400)

    return success_response()
