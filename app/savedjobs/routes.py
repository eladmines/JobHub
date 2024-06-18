
from flask import Blueprint, render_template,request
from app.savedjobs.actions import getSavedJobs,removeSavedJob,saveComment,getComments
import json
from app.utils import removeSpecialChars
savedjobs_bp = Blueprint("savedjobs_bp", __name__ , template_folder='savedjobs')
@savedjobs_bp.route("/savedjobs")
def index():
    return render_template('savedjobs.html') 

@savedjobs_bp.route("/savedjobs", methods=["POST"])
def handle_post_request():
    data = request.get_json()
    action = data['action']
    userId=data['sentData'][0]
    if action == "get saved jobs":
        savedJobs=getSavedJobs(data)
        jobsList =[]
        for job in savedJobs:
            job = vars(job)
            removeSpecialChars(job)
            jobsList.append(job)
        savedJobs = json.dumps(jobsList)
        return savedJobs
    elif action == "remove saved job":
        res = removeSavedJob(data)
        return res
    elif action == "insert a comment":
        jobId=data['sentData'][1]
        dataForaAction=data['sentData'][2]
        res=saveComment(int(userId),dataForaAction,jobId)
        return res
    elif action == "get comments":
        jobId=data['sentData'][1]
        res=getComments(int(userId),jobId)
        return res

    