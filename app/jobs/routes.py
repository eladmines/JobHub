from app.jobs import jobs_bp
from flask import  render_template, redirect, jsonify,request
from app.dbConnections import openConnection, closeConnection
import json
from app.jobs.actions import saveJob,getAllJobs,removeSpecialChars


@jobs_bp.route("/jobs")
def jobsInit():
    con=openConnection()
    curs=con.cursor()
    Jobs = getAllJobs(con,curs)
    jobsList =[]
    for job in Jobs:
        job = vars(job)
        job = removeSpecialChars(job)
        jobsList.append(job)
    jobs = json.dumps(jobsList)
    closeConnection(con)
    return render_template('jobs.html', jobs=jobs)  
    
@jobs_bp.route("/jobs", methods=["POST"])
def handle_post_request():
    data = request.get_json()
    userId=data['sentData'][0]
    jobId=data['sentData'][1]
    action = data['action']
    if(action=="save job"):
        saveJob(userId,jobId)
    return data
