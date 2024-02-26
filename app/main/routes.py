
from flask import Blueprint, render_template, redirect,request
import psycopg2


main_bp = Blueprint("main_bp", __name__ , template_folder='main')

@main_bp.route("/main")
def index():
    return render_template('index.html') 


 