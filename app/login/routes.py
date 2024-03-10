
from flask import Blueprint, render_template, redirect,request, jsonify
import psycopg2
from register.queries import generate_insert_query



login_bp = Blueprint("login_bp", __name__ , template_folder='login')

@login_bp.route("/")
def index():
    return render_template('login.html') 
