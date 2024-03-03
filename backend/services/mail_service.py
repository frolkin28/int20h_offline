from flask_mail import Mail


def configure_mail_service(app):
    app.config['MAIL_SERVER'] = 'smtp.gmail.com'
    app.config['MAIL_PORT'] = 465
    app.config['MAIL_USE_SSL'] = True
    app.config['MAIL_USERNAME'] = 'universitypost21@gmail.com'
    app.config['MAIL_PASSWORD'] = '24hahaton24'

mail = Mail()