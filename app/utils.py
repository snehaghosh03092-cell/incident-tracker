import logging
from flask import request, jsonify
from marshmallow import ValidationError

def setup_request_logger(app):
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s [%(levelname)s %(message)s]"
    )
    
    @app.before_request
    def log_request_info():
        app.logger.info(
            f"REQUEST: {request.method} {request.path} | Payload: {request.get_json(silent=True)}"
        )
    
    @app.after_request
    def log_response_info(response):
        app.logger.info(
            f"RESPONSE: {request.method} {request.path} | Status: {response.status}"
        )
        return response
    
def register_error_handlers(app):
    @app.errorhandler(ValidationError)
    def handle_marshmellow_error(err):
        return jsonify({"error": err.messages}), 400
        
    @app.errorhandler(404)
    def handler_404(err):
        return jsonify({"error": "Resource not found"}), 404
        
    @app.errorhandler(500)
    def handle_500(err):
        return jsonify({"error": "internal server error"})
            
            
