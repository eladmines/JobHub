from flask import render_template,request
from app.applications import applications_bp
from app.applications.actions import get_applications,save_application,remove_application
from app.utils import remove_special_chars
from app.savedjobs.actions import get_saved_jobs_ids
import json


@applications_bp.route("/applications", methods=["GET"])
def handle_get_request():
    return render_template('applications.html') 

@applications_bp.route("/applications", methods=["POST"])
def handle_post_request():
    data = request.get_json()
    action = data['action']
    userId=data['sentData']
    if action == "get applications":
        appliedJobs=get_applications(data)
        jobsList =[]
        for job in appliedJobs:
            remove_special_chars(job)
            if job["id"] in get_saved_jobs_ids(userId):
                job["saved"]="yes"
            else:
                job["saved"]="no"
            jobsList.append(job)
        appliedJobs = json.dumps(jobsList)
        return appliedJobs
    
    elif action == "save application":
        jobId=data['sentData'][1]
        save_application(userId[0],jobId)
        return data
    
    elif action == "remove job application":
        res = remove_application(data)
        return res
    return data
