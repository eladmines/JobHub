
from flask import render_template,request,jsonify
from app.savedjobs.actions import get_saved_jobs,remove_saved_job,save_job
from app.savedjobs import savedjobs_bp


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
    
    if data is None:
        return jsonify({"error": "No data provided"}), 400
    user_id = data['sentData'][0]

    if user_id is None:
        return jsonify({"error": "action or user_id missing in request data"}), 400
    sent_data = data['sentData']
    res = save_job(sent_data)
    if res == False:
        return jsonify({"error": "Failed to dave job"}), 400
    return jsonify(res)


@savedjobs_bp.route("/savedjobs/<user_id>/<job_to_delete>", methods=["DELETE"])
def handle_delete_request(user_id,job_to_delete):
    print("token",user_id)
    if user_id is None or job_to_delete is None:
        return jsonify("Error: user_id or job_to_delete is null"),400
    data=[user_id,int(job_to_delete)]
    res = remove_saved_job(data)
    if res == False:
        return jsonify("Error:Failed to delete job"),400
    return jsonify("Job successfully deleted"),200
