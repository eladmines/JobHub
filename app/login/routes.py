
from flask import Blueprint, render_template, redirect,request
import psycopg2


login_bp = Blueprint("login_bp", __name__ , template_folder='login')

@login_bp.route("/")
def index():
    return render_template('login.html') 


 