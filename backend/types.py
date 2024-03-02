import typing as t


class SignUpPayload(t.TypedDict):
    first_name: str
    last_name: str
    email: str
    password: str
    role: int
    group: t.NotRequired[str]


class SignInPayload(t.TypedDict):
    email: str
    password: str


class CreateSubjectPayload(t.TypedDict):
    name: str
    group_id: int
    activities: t.List[dict]
