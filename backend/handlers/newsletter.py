from flask import Blueprint, request
from typing import cast
from backend.lib.newsletter import create_message
from backend.utils import success_response, error_response
from marshmallow import ValidationError
from backend.exc import MessageNotsent
bp = Blueprint("newsletter", __name__, url_prefix="/api/newsletter")

from backend.types import  loadMailtemplate
from backend.lib.schemas import mailSchema

@bp.route("/")
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
                content:
                    application/json:
                        schema: success_response
            '400':
                content:
                    application/json:
                        schema: error_response
        tags:
        - newsletter
    """
    try:
        request_message = cast(
            loadMailtemplate,
            mailSchema().load(
                {
                    "target": request.form.get("target"),
                    "text": request.form.get("text"),
                }
            ),
        )
    except ValidationError as e:
        return error_response(status_code=400, errors=e.messages)

    try:
        create_message(request_message)
    except:
        return MessageNotsent(status_code=404)

    return success_response