from flask import Flask
from apispec import APISpec
from apispec.ext.marshmallow import MarshmallowPlugin
from apispec_webframeworks.flask import FlaskPlugin

from backend.lib.schemas import (
    SignUpSchema,
    SignInSchema,
    AuthSuccessResponse,
    ErrorMessageResponse,
    SignInErrorResponse,
    SignUpErrorResponse,
    CreateSubjectSchema,
    FullSubjectSchema,
    ActivitySchema,
    UpsertSubjectSuccessResponse,
    UpsertSubjectErrorResponse,
    AccountResponse,
    SubjectGroupShcema,
    SubjectActivitesShcema,
    UserUpdateSchema,
    ActivityResponse,
)


TAGS = (
    {"name": "auth", "description": "Ендпоінти для аутентифікації"},
    {"name": "group", "description": "Ендпоінти для маніпуляцій з групами"},
    {"name": "journal", "description": "Ендпоінти функціоналу університета"},
    {"name": "users", "description": "Ендпоінти користувачів"},
    {"name": "activity", "description": "Ендпоінти активностей"},
)


EXCLUDED_ENDPOINTS = {
    "static",
    "swagger",
}


def create_tags(spec: APISpec):
    for tag in TAGS:
        spec.tag(tag)


def load_docstrings(spec: APISpec, app: Flask):
    for fn_name in app.view_functions:
        if fn_name in EXCLUDED_ENDPOINTS:
            continue
        view_fn = app.view_functions[fn_name]
        spec.path(view=view_fn)


def get_apispec(app: Flask) -> APISpec:
    spec = APISpec(
        title="INT20H apidocs",
        version="1.0.0",
        openapi_version="3.0.3",
        plugins=[FlaskPlugin(), MarshmallowPlugin()],
    )

    spec.components.schema("SignUpSchema", schema=SignUpSchema)
    spec.components.schema("SignInSchema", schema=SignInSchema)

    spec.components.schema("AuthSuccessResponse", schema=AuthSuccessResponse)
    spec.components.schema("ErrorMessageResponse", schema=ErrorMessageResponse)
    spec.components.schema("SignInErrorResponse", schema=SignInErrorResponse)
    spec.components.schema("SignUpErrorResponse", schema=SignUpErrorResponse)

    spec.components.schema("FullSubjectSchema", schema=FullSubjectSchema)
    spec.components.schema("ActivitySchema", schema=ActivitySchema)
    spec.components.schema("CreateSubjectSchema", schema=CreateSubjectSchema)
    spec.components.schema(
        "UpsertSubjectSuccessResponse", schema=UpsertSubjectSuccessResponse
    )
    spec.components.schema(
        "UpsertSubjectErrorResponse", schema=UpsertSubjectErrorResponse
    )
    spec.components.schema("AccountResponse", schema=AccountResponse)
    spec.components.schema("SubjectGroupShcema", schema=SubjectGroupShcema)
    spec.components.schema("SubjectActivitesShcema", schema=SubjectActivitesShcema)
    spec.components.schema("UserUpdateSchema", schema=UserUpdateSchema)
    
    spec.components.schema("ActivityResponse", schema=ActivityResponse)

    create_tags(spec)

    load_docstrings(spec, app)

    return spec
