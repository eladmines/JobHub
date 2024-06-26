from flask import Blueprint, render_template
from flask import  render_template,request
import json
from app.applications.actions import getApplications,saveApplication,removeApplication
from app.utils import removeSpecialChars
from app.savedjobs.actions import GetSavedJobsIds
applications_bp = Blueprint("applications_bp", __name__ , template_folder='applications')

@applications_bp.route("/applications", methods=["GET"])
def handle_get_request():
    return render_template('applications.html') 


@applications_bp.route("/applications", methods=["POST"])
def handle_post_request():
    data = request.get_json()
    action = data['action']
    userId=data['sentData'][0]
    print(action)
    if action == "get applications":
        appliedJobs=getApplications(data)
        jobsList =[]
        for job in appliedJobs:
            job = vars(job)
            job["applied"]="yes"
            removeSpecialChars(job)
            if job["id"] in GetSavedJobsIds(userId):
                job["saved"]="yes"
            else:
                job["saved"]="no"
            jobsList.append(job)
        appliedJobs = json.dumps(jobsList)
        return appliedJobs
    elif action == "save application":
        
        jobId=data['sentData'][1]
        saveApplication(userId,jobId)
        return data
    elif action == "remove job application":
        res = removeApplication(data)
        return res
    return data
