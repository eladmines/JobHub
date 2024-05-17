from flask import Blueprint, render_template,request, jsonify
profile_bp = Blueprint("profile_bp", __name__ , template_folder='profile')


    

@profile_bp.route("/profile", methods=["GET","POST"])
def handle_post_request():
    data = request.get_json()
    print(data)
    return render_template('profile.html') 