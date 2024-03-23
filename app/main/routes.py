
from flask import Blueprint, render_template, redirect,request, redirect, jsonify, redirect, url_for, make_response
import psycopg2


main_bp = Blueprint("main_bp", __name__ , template_folder='main')

@main_bp.route("/main")
def index():
    username = request.cookies.get('username')
    if(username):
        print(username)
        return render_template('index.html') 
    else:
      print("no")
      #return redirect(url_for('\jobs'))
      return render_template('index.html') 


 