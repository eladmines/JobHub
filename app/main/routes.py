
from flask import Blueprint, render_template,request, jsonify
from app.main.actions import getUserData,getProfileData

main_bp = Blueprint("main_bp", __name__ , template_folder='main')

@main_bp.route("/main")
def index():
      return render_template('main.html') 

@main_bp.route("/main", methods=["POST"])
def handle_post_request():
    data = request.get_json()
    user = getUserData(data)
    profile = getProfileData(user['id'])
    allDetails={}
    allDetails.update(user)
    allDetails.update(profile)
    return jsonify(allDetails)
