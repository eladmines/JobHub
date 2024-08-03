from flask import request,jsonify
from app.sending_email import sending_email_bp

@sending_email_bp.route("/reset-password", methods=["POST"])
def handle_post_request():
    data = request.get_json()