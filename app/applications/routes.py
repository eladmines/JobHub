from flask import render_template,request,jsonify
from app.applications.actions import get_applications,save_application,remove_application
from app.applications import applications_bp

@applications_bp.route("/applications")
def index():
    return render_template('applications.html') 

@applications_bp.route("/applications/<user_id>", methods=["GET"])
def handle_get_request(user_id):
    if(user_id is None):
        jsonify("Error: user_id is null"),400
    jobs,error = get_applications(user_id)
    if error:
        return jsonify({"error":error}),400
    return jsonify(jobs), 200
    
@applications_bp.route("/applications", methods=["POST"])
def handle_post_request():
    data = request.get_json()
    if(data is None):
        return jsonify({"error": "No data provided"}), 400
    sent_data = data['sentData']
    res = save_application(sent_data)
    if(res == False):
        return jsonify({"error": "Failed to save application"}), 400
    return jsonify(res)

@applications_bp.route("/applications/<user_id>/<application_to_delete>", methods=["DELETE"])
def handle_delete_request(user_id,application_to_delete):
    if(user_id is None or application_to_delete is None):
        return jsonify("Error: user_id or application_to_delete is null"),400
    data=[user_id,int(application_to_delete)]
    res = remove_application(data)
    if(res == False):
        return jsonify("Error:Failed to delete job"),400
    return jsonify("Job successfully deleted"),200