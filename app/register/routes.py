
from flask import Blueprint, render_template,request, jsonify
from app.register.actions import register_user
from app.models.user import User
from app.register import register_bp

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
    user = User(id,firstname,lastname,email,password,role,company,experience,skills)
    res = register_user(user)
    return jsonify(res)


