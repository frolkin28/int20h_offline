import typing as t


class SignUpPayload(t.TypedDict):
    first_name: str
    last_name: str
    email: str
    password: str


class SignInPayload(t.TypedDict):
    email: str
    password: str
