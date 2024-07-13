from app.jobs import jobs_bp
from flask import  render_template,jsonify
from app.jobs.actions import get_all_jobs

@jobs_bp.route("/jobs")
def index():
    return render_template('jobs.html') 

@jobs_bp.route("/jobs/<user_id>", methods=["GET"])
def handle_get_request(user_id):
    if(user_id is None):
        jsonify("Error: user_id is null"),400
    jobs,error = get_all_jobs(user_id)
    if error:
        return jsonify({"error":error}),400
    return jsonify(jobs), 200
