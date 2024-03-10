
from flask import Blueprint, render_template, redirect,request, jsonify
import psycopg2
from register.queries import generate_insert_query

register_bp = Blueprint("register_bp", __name__ , template_folder='register')

@register_bp.route("/register")
def index():
    return render_template('register.html') 

@register_bp.route("/register", methods=["POST"])
def handle_post_request():
    data = request.get_json()
    uniqueUser=generate_insert_query(data)
    return jsonify(uniqueUser)