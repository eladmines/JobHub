from flask import render_template,request,jsonify
from app.utils import open_connection,close_connection
from app.profile.queries import UPDATE_USER_DETAILS
from app.profile import profile_bp
from sqlalchemy import text 
@profile_bp.route("/profile", methods=["GET"])
def handle_get_request():
    return render_template('profile.html') 

@profile_bp.route("/profile", methods=["POST"])
def handle_post_request():
    data = request.get_json()
    user_details = {
    'id': data['sentData']['id'],
    'firstname': data['sentData']['firstname'],
    'lastname': data['sentData']['lastname'],
    'email': data['sentData']['email'],
    'role': data['sentData']['role'],
    'company': data['sentData']['company'],
    'experience': data['sentData']['experience'],
    'skills': data['sentData']['skills']
}
    con=open_connection()
    con.execute(text(UPDATE_USER_DETAILS),user_details)
    con.commit()
    return jsonify("Update successful")