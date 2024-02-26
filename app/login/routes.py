
from flask import Blueprint, render_template, redirect,request, jsonify
import psycopg2



login_bp = Blueprint("login_bp", __name__ , template_folder='login')

@login_bp.route("/")
def index():
    return render_template('login.html') 


@login_bp.route("/", methods=["POST"])
def handle_post_request():
    # Access data from the POST request
    data = request.get_json()
    # Your logic for handling the POST request data goes here
    
    # Return a response if needed
    response_data = {"message": "Data received successfully!"}
    
    return jsonify(response_data)


 