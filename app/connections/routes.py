from flask import  render_template, jsonify,request
from app.connections import connections_bp
from app.connections.actions import get_connections,add_connection,delete_connection
@connections_bp.route("/connections")
def index():
    return render_template('connections.html')

@connections_bp.route("/connections/<user_id>" , methods=["GET"])
def handle_get_request(user_id):
    if(user_id is None):
        return jsonify("Error: user_id is null"),400
    connections,error = get_connections(user_id)
    if error:
         return jsonify("Error: Failed to get connection"),400  
    return jsonify(connections),200

@connections_bp.route("/connections", methods=["POST"])
def handle_post_request():
    data=request.get_json()
    data = tuple(data['sentData'].values())[1:]
    print(data)
    add_connection(data)
    return jsonify(True)

@connections_bp.route("/connections/<user_id>/<connection_to_delete>", methods=["DELETE"])
def handle_delete_request(user_id,connection_to_delete):
    data=[user_id,int(connection_to_delete)]
    delete_connection(data)
    return data

