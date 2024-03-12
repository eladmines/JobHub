
from flask import Blueprint, render_template, redirect,request, jsonify
import psycopg2
from login.queries import checkLoginDetails



login_bp = Blueprint("login_bp", __name__ , template_folder='login')

@login_bp.route("/")
def index():
    return render_template('login.html') 

@login_bp.route("/", methods=["POST"])
def handle_post_request():
    data = request.get_json()
    loginDetails=checkLoginDetails(data)
    print(loginDetails)
    return jsonify(loginDetails)