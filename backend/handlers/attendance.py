from flask import Blueprint


bp = Blueprint("attendance", __name__, url_prefix="/api/attendance")


@bp.route("", methods=("POST",))
def create_attendance():
    pass
