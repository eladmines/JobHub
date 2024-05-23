from flask import Blueprint, render_template
profile_bp = Blueprint("profile_bp", __name__ , template_folder='profile')

@profile_bp.route("/profile", methods=["GET"])
def handle_post_request():
    return render_template('profile.html') 