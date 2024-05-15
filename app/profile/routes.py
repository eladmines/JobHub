from flask import Blueprint, render_template,request, jsonify
profile_bp = Blueprint("profile_bp", __name__ , template_folder='profile')
@profile_bp.route("/profile")
def index():
    return render_template('profile.html') 