from flask import Flask
from flask_mail import Mail


def configure_mail_service(app: Flask):
    app.config["MAIL_SERVER"] = "smtp.gmail.com"
    app.config["MAIL_PORT"] = 465
    app.config["MAIL_USE_SSL"] = True
    app.config["MAIL_USERNAME"] = "stateenterprise2023@gmail.com"
    app.config["MAIL_PASSWORD"] = "zcmbjpgliwjwzqdy"


mail = Mail()
