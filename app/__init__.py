from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from .config import Config
from .utils import setup_request_logger, register_error_handlers
from .extensions import db, migrate
from app.routes.routes import incident_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    db.init_app(app)
    migrate.init_app(app, db)
    CORS(app)

    setup_request_logger(app)
    register_error_handlers(app)
    app.register_blueprint(incident_bp)
    return app