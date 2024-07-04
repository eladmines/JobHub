from app.jobs import jobs_bp
from flask import  render_template,request
from app.dbConnections import open_connection, close_connection
import json
from app.jobs.actions import get_all_jobs
from app.utils import remove_special_chars
from app.savedjobs.actions import get_saved_jobs_ids
from app.applications.actions import get_applications_ids

@jobs_bp.route("/jobs")
def index():
    return render_template('jobs.html') 

@jobs_bp.route("/jobs", methods=["POST"])
def handle_post_request():
    data = request.get_json()
    con=open_connection()
    curs=con.cursor()
    savedJobsIds=get_saved_jobs_ids(data['sentData'])
    applicationsJobsIds=get_applications_ids(data['sentData'])
    jobs=get_all_jobs(curs)
    jobsList =[]
    for job in jobs:
        job = vars(job)
        remove_special_chars(job)
        job["saved"]="no"
        job["applied"]="no"
        if(job['id'] in savedJobsIds):
            job["saved"]="yes"
        else:
            job["saved"]="no"
        for application in applicationsJobsIds:
            if job['id']==application[0]:
                job["applied"]=application[1]
                break
            else:
                job["applied"]="no"
        jobsList.append(job)
    jobs = json.dumps(jobsList)
    close_connection(con)
    return jobs

