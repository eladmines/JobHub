from flask import render_template,request,jsonify
from app.utils import open_connection,close_connection,get_id_by_token,get_query_exec,save_query_exec
from app.profile.queries import UPDATE_USER_DETAILS,GET_USER_DATA
from app.profile import profile_bp
from sqlalchemy import text 
from app.models.user import User
@profile_bp.route("/profile", methods=["GET"])
def handle_get_request():
    return render_template('profile.html') 

@profile_bp.route("/profile", methods=["POST"])
def handle_post_request():
    data = request.get_json()
    token = data['sentData']
    id=get_id_by_token(token)
    params = {'id':id}
    res = get_query_exec(GET_USER_DATA,params)
    user = User ("",res[0]['firstname'],res[0]['lastname'],"","",res[0]['role'],res[0]['company'],res[0]['experience'],res[0]['skills'])
    """con=open_connection()
    con.execute(text(UPDATE_USER_DETAILS),user_details)
    con.commit()"""
    return jsonify(user.__dict__)

@profile_bp.route("/profile/update", methods=["POST"])
def handle_update_request():
    
    data = request.get_json()
    token = data['sentData'][1]
    id=get_id_by_token(token)
    user = User (id,data['sentData'][0]['firstname'],data['sentData'][0]['lastname'],"","",data['sentData'][0]['role'],data['sentData'][0]['company'],data['sentData'][0]['experience'],data['sentData'][0]['skills'])
    user = user.__dict__
    save_query_exec(UPDATE_USER_DETAILS,user)
    return jsonify(True)