from flask import Blueprint

from backend.lib.activity import get_activity
from backend.utils import success_response, error_response


bp = Blueprint("activity", __name__, url_prefix="/api/activity")


@bp.route("/<int:activity_id>")
def activity(activity_id: int):
    """
    ---
    get:
        summary: Отримати активність
        responses:
            '200':
                content:
                    application/json:
                        schema: ActivityResponse
        tags:
        - activity
    """
    activity = get_activity(activity_id)
    if not activity:
        return error_response(status_code=404)
    return success_response(
        data=activity,
    )
