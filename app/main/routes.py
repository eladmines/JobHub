
from flask import Blueprint, render_template,request, jsonify
import psycopg2
from main.actions import getUserData
from models import user


main_bp = Blueprint("main_bp", __name__ , template_folder='main')

@main_bp.route("/main")
def index():
      return render_template('main.html') 

@main_bp.route("/main", methods=["POST"])
def handle_post_request():
    data = request.get_json()
    res = getUserData(data)
    return jsonify(res)
