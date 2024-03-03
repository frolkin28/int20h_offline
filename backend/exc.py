class AuthenticationError(Exception):
    pass


class UserDoesNotExist(Exception):
    pass


class UserAlreadyExist(Exception):
    pass


class GroupDoesNotExist(Exception):
    pass

class MessageNotsent(Exception):
    pass
