
from flask import render_template,request
from app.savedjobs.actions import get_saved_jobs,remove_saved_job,save_job
import json
from app.utils import remove_special_chars
from app.applications.actions import get_applications_ids
from app.savedjobs import savedjobs_bp

@savedjobs_bp.route("/savedjobs")
def index():
    return render_template('savedjobs.html') 

@savedjobs_bp.route("/savedjobs", methods=["POST"])
def handle_post_request():
    data = request.get_json()
    action = data['action']
    userId=data['sentData']
    if action == "get saved jobs":
        savedJobs=get_saved_jobs(data)
        applications = get_applications_ids(userId)
        jobsList =[]
        for job in savedJobs:
            job = vars(job)
            job["saved"]="yes"
            job["applied"]="no"
            remove_special_chars(job)
            for application in applications:
                if job["id"] == application[0]:
                    job["applied"]=application[1]   
            jobsList.append(job)
        savedJobs = json.dumps(jobsList)
        return savedJobs
    elif action == "remove saved job":
        res = remove_saved_job(data)
        return res
    elif action == "save job":
        jobId=data['sentData'][1]
        save_job(userId[0],jobId)
        return data
    return data
    