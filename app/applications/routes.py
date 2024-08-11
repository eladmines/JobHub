from flask import render_template,request,jsonify
from app.applications.actions import get_applications,save_application,remove_application,get_applications_processes,remove_process_application,save_process
from app.applications import applications_bp

@applications_bp.route("/applications")
def index():
    return render_template('applications.html') 

@applications_bp.route("/applications/<user_id>", methods=["GET"])
def handle_get_request(user_id):
    if user_id is None:
        jsonify("Error: user_id is null"),400
    jobs,error = get_applications(user_id)
    if error:
        return jsonify({"error":error}),400
    return jsonify(jobs), 200

    
@applications_bp.route("/applications", methods=["POST"])
def handle_post_request():
    data = request.get_json()
    if data is None:
        return jsonify({"error": "No data provided"}), 400
    user_id,job_id={data['sentData'][0],data['sentData'][1]}
    res = save_application(user_id,job_id)
    if res == False:
        return jsonify({"error": "Failed to save application"}), 400
    return jsonify(res)


@applications_bp.route("/applications/<user_id>/<application_to_delete>", methods=["DELETE"])
def handle_delete_request(user_id,application_to_delete):
    if user_id is None or application_to_delete is None:
        return jsonify("Error: user_id or application_to_delete is null"),400
    data=[user_id,int(application_to_delete)]
    res = remove_application(data)
    if res == False:
        return jsonify("Error:Failed to delete job"),400
    return jsonify("Job successfully deleted"),200

@applications_bp.route("/delete-processes-applications/<user_id>/<process_to_delete>", methods=["DELETE"])
def handle_delete_request_process(user_id,process_to_delete):
    if user_id is None or process_to_delete is None:
        return jsonify("Error: user_id or application_to_delete is null"),400
    process_to_delete =(process_to_delete,)
    res = remove_process_application(process_to_delete)
    if res == False:
        return jsonify("Error:Failed to delete job"),400
    return jsonify("Job successfully deleted"),200


@applications_bp.route("/app-process/<user_id>/<job_id>", methods=["GET"])
def handle_get_request_notes(user_id,job_id):
    if user_id is None or job_id is None:
        jsonify("Error: user_id or job_id is null"),400
    notes,error = get_applications_processes(user_id,job_id)
    if error:
        return jsonify({"error":error}),400
    return jsonify(notes), 200

@applications_bp.route("/add-process", methods=["POST"])
def handle_post_request_process():
    data = request.get_json()
    if data is None:
        return jsonify({"error": "No data provided"}), 400
    sent_data = data['sentData']
    data = tuple(data['sentData'].values())
    res = save_process(data)
    if res == False:
       return jsonify({"error": "Failed to save application"}), 400
    return jsonify(res)