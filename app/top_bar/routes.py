from flask import request,jsonify
from app.top_bar import top_bar_bp
from app.top_bar.actions import get_name
from app.utils import get_id_by_token

@top_bar_bp.route("/top-bar", methods=["POST"])
def handle_post_request():
    data = request.get_json()
    token = data['sentData']
    id=get_id_by_token(token)
    details = get_name(id)
    return jsonify(details)
