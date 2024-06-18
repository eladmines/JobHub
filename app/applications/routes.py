from flask import Blueprint, render_template
applications_bp = Blueprint("applications_bp", __name__ , template_folder='applications')

@applications_bp.route("/applications", methods=["GET"])
def handle_post_request():
    return render_template('applications.html') 
