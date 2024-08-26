
from flask import render_template,request,jsonify
from app.savedjobs.actions import get_saved_jobs,remove_saved_job,save_job
from app.savedjobs import savedjobs_bp
from app.utils import get_id_by_token

@savedjobs_bp.route("/savedjobs")
def index():
    return render_template('savedjobs.html') 

@savedjobs_bp.route("/savedjobs/<user_id>", methods=["GET"])
def handle_get_request(user_id):
    if user_id is None:
        jsonify("Error: user_id is null"),400
    jobs,error = get_saved_jobs(user_id)
    if error:
        return jsonify({"error":error}),400
    return jsonify(jobs), 200

@savedjobs_bp.route("/savedjobs", methods=["POST"])
def handle_post_request():
    data = request.get_json()
    token = request.headers.get('Authorization')
    user_id = get_id_by_token(token)
    if data is None:
        return jsonify({"error": "No data provided"}), 400
    if user_id is None:
        return jsonify({"error": "action or user_id missing in request data"}), 400
    job_id = data['sentData']
    
    res = save_job(user_id,job_id)
    if res == False:
        return jsonify({"error": "Failed to dave job"}), 400
    return jsonify(res)


@savedjobs_bp.route("/savedjobs/<job_to_delete>", methods=["DELETE"])
def handle_delete_request(job_to_delete):
    token = request.headers.get('Authorization')
    user_id = get_id_by_token(token)
    
    if job_to_delete is None:
        return jsonify("Error: user_id or job_to_delete is null"),400
    
    job_to_delete=int(job_to_delete)
    res = remove_saved_job(user_id,job_to_delete)
    if res == False:
        return jsonify("Error:Failed to delete job"),400
    return jsonify("Job successfully deleted"),200
