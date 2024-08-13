
from flask import render_template,request, jsonify
from app.login.actions import authentication
from app.models.user import User
from app.login import login_bp

@login_bp.route("/")
def index():
    return render_template('login.html') 

@login_bp.route("/", methods=["POST"])
def handle_post_request():
    data = request.get_json()
    if data is None:
        return jsonify({"error": "No JSON data received"}), 400
    try:
        email=data['sentData']['email']
        password=data['sentData']['password']
        loginDetails=authentication(email,password)
        print("login_details",loginDetails)
        if loginDetails is None:
            return jsonify({"error": "Authentication failed. Incorrect email or password."}), 401
        #user = User(loginDetails[0],loginDetails[1],loginDetails[2],loginDetails[3],loginDetails[4],loginDetails[5],loginDetails[6],loginDetails[7],loginDetails[8])
        
        #if user is None:
        #     return jsonify ({"error":"No user created"})
        #user=vars(user)
        print("user")
        return loginDetails
    except Exception as e:
            return {"error": f"An error occurred: {str(e)}"}, 500
