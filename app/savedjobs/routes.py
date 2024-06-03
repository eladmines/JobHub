
from flask import Blueprint, render_template,request
from app.savedjobs.actions import getSavedJobs,removeSavedJob


savedjobs_bp = Blueprint("savedjobs_bp", __name__ , template_folder='savedjobs')
@savedjobs_bp.route("/savedjobs")
def index():
    return render_template('savedjobs.html') 

@savedjobs_bp.route("/savedjobs", methods=["POST"])
def handle_post_request():
    data = request.get_json()
    if data['action'] == "get saved jobs":
        savedJobs=getSavedJobs(data)
        return savedJobs
    if data['action'] == "remove saved job":
        res = removeSavedJob(data)
        return res

    