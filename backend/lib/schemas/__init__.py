from backend.lib.schemas.validation import (
    SignUpSchema,
    SignInSchema,
    CreateSubjectSchema,
    FullSubjectSchema,
    ActivitySchema,
    SubjectGroupShcema,
    SubjectActivitesShcema,
    UserUpdateSchema,
    EditAttendanceSchema,
    mailSchema,
)

from backend.lib.schemas.docs import (
    ErrorMessageResponse,
    SignInErrorResponse,
    SignUpErrorResponse,
    AuthSuccessResponse,
    UpsertSubjectSuccessResponse,
    UpsertSubjectErrorResponse,
    AccountResponse,
    ActivityResponse,
    GroupsListResponse,
    StudentsListResponse,
)
