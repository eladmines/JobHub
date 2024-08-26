
from flask import render_template,request, jsonify
from app.login.actions import authentication
from app.models.user import User
from app.login import login_bp

@login_bp.route("/login")
def index():
    return render_template('login.html') 

@login_bp.route("/login", methods=["POST"])
def handle_post_request():
    data = request.get_json()
    if data is None:
        return jsonify({"error": "No JSON data received"}), 400
    try:
        email=data['sentData']['email']
        password=data['sentData']['password']
        loginDetails=authentication(email,password)
        if loginDetails is None:
            return jsonify({"error": "Authentication failed. Incorrect email or password."}), 401
        return jsonify({'token':loginDetails})
    except Exception as e:
            return jsonify({"error": f"An error occurred: {str(e)}"}), 500
