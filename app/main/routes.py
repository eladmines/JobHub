
from flask import render_template,request, jsonify
from app.main.actions import get_profile_data
from app.main import main_bp

@main_bp.route("/main")
def index():
      return render_template('main.html') 

@main_bp.route("/main", methods=["POST"])
def handle_post_request():
    data = request.get_json()
    if data['action'] == 'get profile data':
            profile = get_profile_data(data['sentData'])
    return jsonify(profile)
