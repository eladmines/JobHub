from flask import  render_template, jsonify,request
from app.connections import connections_bp
from app.connections.actions import get_connections,add_connection,delete_connection
from app.utils import get_id_by_token
from app.models.connection import Connection
@connections_bp.route("/connections")
def index():
    return render_template('connections.html')

@connections_bp.route("/connections/<token>" , methods=["GET"])
def handle_get_request(token):
    if(token is None):
        return jsonify("Error: user_id is null"),400
    user_id = get_id_by_token(token)
    
    connections,error = get_connections(user_id)
    if error:
         return jsonify("Error: Failed to get connection"),400  
    return jsonify(connections),200

@connections_bp.route("/connections", methods=["POST"])
def handle_post_request():
    data=request.get_json()
    token = request.headers.get('Authorization')
    user_id = get_id_by_token(token)
    new_connection = Connection("",data['sentData']['name'],data['sentData']['position'],data['sentData']['company'],data['sentData']['phone'],"accounts")
    res = add_connection(new_connection,user_id)
    return jsonify(res[0])

@connections_bp.route("/delete-connection/<connection_to_delete>", methods=["DELETE"])
def handle_delete_request(connection_to_delete):
    token = request.headers.get('Authorization')
    user_id = get_id_by_token(token)
    connection_to_delete = int(connection_to_delete)
    delete_connection(user_id,connection_to_delete)
    return jsonify(True)

