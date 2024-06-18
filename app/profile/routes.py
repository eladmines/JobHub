from flask import Blueprint, render_template
profile_bp = Blueprint("profile_bp", __name__ , template_folder='profile')

@profile_bp.route("/profile", methods=["GET"])
def handle_get_request():
    return render_template('profile.html') 

@profile_bp.route("/profile", methods=["POST"])
def handle_post_request():
    ### Here to call UPDATE_USER_DETAILS query
    return render_template('profile.html') 