from app.jobs import jobs_bp
from flask import  render_template,request
from app.dbConnections import openConnection, closeConnection
import json
from app.jobs.actions import getAllJobs
from app.utils import removeSpecialChars
from app.savedjobs.actions import GetSavedJobsIds
from app.applications.actions import getApplicationsIds
@jobs_bp.route("/jobs")
def index():
    return render_template('jobs.html') 

@jobs_bp.route("/jobs", methods=["POST"])
def handle_post_request():
    data = request.get_json()
    con=openConnection()
    curs=con.cursor()
    savedJobsIds=GetSavedJobsIds(data['sentData'])
    applicationsJobsIds=getApplicationsIds(data['sentData'])
    jobs=getAllJobs(curs)
    jobsList =[]
    for job in jobs:
        job = vars(job)
        removeSpecialChars(job)
        if(job['id'] in savedJobsIds):
            job["saved"]="yes"
        else:
            job["saved"]="no"
        if(job['id'] in applicationsJobsIds):
            job["applied"]="yes"
        else:
            job["applied"]="no"
        jobsList.append(job)
    jobs = json.dumps(jobsList)
    closeConnection(con)
    return jobs

