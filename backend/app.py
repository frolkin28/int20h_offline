import json

from flask import Flask
from flask_cors import CORS

from backend.handlers import (
    health,
    auth,
    swagger,
    journal,
    group,
    user,
    activity,
    student,
    attendance,
    newsletter,
)
from backend.config import get_config
from backend.services.db import db, migrate
from backend.lib.auth import jwt
from backend.lib.apispec import get_apispec
from backend.services.mail_service import configure_mail_service, mail

def create_app() -> Flask:
    app = Flask(__name__)
    config = get_config()
    app.config.from_object(config)

    app.register_blueprint(health.bp)
    app.register_blueprint(auth.bp)
    app.register_blueprint(journal.bp)
    app.register_blueprint(group.bp)
    app.register_blueprint(user.bp)
    app.register_blueprint(activity.bp)
    app.register_blueprint(student.bp)
    app.register_blueprint(attendance.bp)
    app.register_blueprint(newsletter.bp)

    db.init_app(app)
    migrate.init_app(app, db)
    mail.init_app(app)


    configure_mail_service(app)

    jwt.init_app(app)

    @app.route("/swagger")
    def create_swagger_spec():
        return json.dumps(get_apispec(app).to_dict())

    app.register_blueprint(swagger.bp)

    CORS(
        app,
        resources={
            r"/api/*": {"origins": "*"},
        },
    )

    return app
