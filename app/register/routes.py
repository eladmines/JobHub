
from flask import render_template,request, jsonify
from app.register.actions import register_user
from app.models.user import User
from app.register import register_bp
from app.register.actions import hash_password
@register_bp.route("/register")
def index():
    return render_template('register.html') 

@register_bp.route("/register", methods=["POST"])
def handle_post_request():
    data = request.get_json()
    id=data['sentData']['id']
    firstname=data['sentData']['firstname']
    lastname=data['sentData']['lastname']
    email=data['sentData']['email']
    password=data['sentData']['password']
    role=data['sentData']['role']
    company=data['sentData']['company']
    experience=data['sentData']['experience']
    skills=data['sentData']['skills']
    user = User(id,firstname,lastname,email,hash_password(password),role,company,experience,skills)
    res = register_user(user)
    return jsonify(res)


