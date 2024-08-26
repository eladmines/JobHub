
from flask import render_template,request, jsonify
from app.main.actions import get_profile_data,get_user_data
from app.utils import get_id_by_token
from app.main import main_bp

@main_bp.route("/")
def index():
      return render_template('main.html') 

@main_bp.route("/", methods=["POST"])
def handle_post_request():
    data = request.get_json()
    token = data['sentData']
    id=get_id_by_token(token)
    details = get_user_data(id)
    profile = get_profile_data(id)
    combined_dict = {**details, **profile}
    return jsonify(combined_dict)
