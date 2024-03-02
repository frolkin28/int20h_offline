from datetime import datetime
from functools import wraps
from typing import Callable, Any

from flask_jwt_extended import (
    JWTManager,
    decode_token,
    get_current_user,
    verify_jwt_in_request,
)
from jwt import ExpiredSignatureError
from sqlalchemy.exc import IntegrityError
from werkzeug.security import generate_password_hash, check_password_hash

from backend.exc import (
    UserAlreadyExist,
    UserDoesNotExist,
    AuthenticationError,
    GroupDoesNotExist,
)
from backend.models import TokenBlocklist, User, Role
from backend.types import SignUpPayload
from backend.services.db import db
from backend.models import User, Role, Group
from backend.utils import error_response


jwt = JWTManager()


def get_user_or_none() -> User | None:
    try:
        user = get_current_user()
    except (RuntimeError, AttributeError):
        user = None

    return user


@jwt.user_identity_loader
def user_identity_lookup(user: User) -> int:
    return user.id


def get_user_by_identity(identity: int) -> User | None:
    return User.query.filter(User.id == identity).one_or_none()


@jwt.user_lookup_loader
def user_lookup_callback(_, jwt_data: dict):
    identity = jwt_data["sub"]
    return get_user_by_identity(identity)


@jwt.token_in_blocklist_loader
def check_if_token_revoked(_, jwt_payload: dict) -> bool:
    jti = jwt_payload["jti"]
    token = (
        db.session.query(TokenBlocklist.id).filter(TokenBlocklist.jti == jti).scalar()
    )

    return token is not None


def create_user(payload: SignUpPayload) -> User:
    group_name = payload.get("group")
    group_id = None

    if payload["role"] == Role.STUDENT:
        group_id = (
            db.session.query(Group.id)
            .filter(
                Group.name == group_name,
            )
            .scalar()
        )
        if group_id is None:
            raise GroupDoesNotExist

    user = User(
        email=payload["email"],
        first_name=payload["first_name"],
        last_name=payload["last_name"],
        password=generate_password_hash(payload["password"]),
        role=payload["role"],
        group_id=group_id,
    )
    db.session.add(user)
    try:
        db.session.commit()
    except IntegrityError as e:
        raise UserAlreadyExist from e

    return user


def authenticate_user(email: str, password: str) -> User:
    user = (
        User.query.with_entities(
            User.id,
            User.password,
        )
        .filter(User.email == email)
        .one_or_none()
    )
    if user is None:
        raise UserDoesNotExist
    if not check_password_hash(user.password, password):
        raise AuthenticationError
    return user


def revoke_token(jti: str):
    now = datetime.now()
    db.session.add(TokenBlocklist(jti=jti, created_at=now))
    db.session.commit()


def verify_user_token(token: str | None) -> User | None:
    if not token:
        return None
    try:
        jwt_data = decode_token(token)
    except ExpiredSignatureError:
        return None

    identity = jwt_data["sub"]
    return get_user_by_identity(identity)


def permissions(roles: list[Role]):
    """
    Usage:
    @app.route("/example")
    @permissions([Role.STUDENT])
    def example():
        pass
    """

    def decorator(func: Callable) -> Callable:
        @wraps(func)
        def wrapper(*args: Any, **kwargs: Any):
            if not verify_jwt_in_request():
                return error_response(
                    status_code=401,
                    errors={"message": "You have to be authrized"},
                )

            user = get_user_or_none()
            if not user or user.role not in roles:
                return error_response(
                    status_code=401,
                    errors={"message": "Not allowed"},
                )
            result = func(*args, **kwargs)
            return result

        return wrapper

    return decorator
