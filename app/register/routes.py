
from flask import Blueprint, render_template, redirect,request
import psycopg2


register_bp = Blueprint("register_bp", __name__ , template_folder='register')

@register_bp.route("/register")
def index():
    return render_template('register.html') 


 