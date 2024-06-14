from app.jobs import jobs_bp
from flask import  render_template, redirect, jsonify,request
from app.dbConnections import openConnection, closeConnection
import json
from app.jobs.actions import saveJob,getAllJobs

@jobs_bp.route("/jobs")
def jobsInit():
    con=openConnection()
    curs=con.cursor()
    Jobs = getAllJobs(con,curs)
    jobsList =[]
    for job in Jobs:
        job = vars(job)
        job["title"]=job["title"].replace("'"," ")
        job["description"]=job["description"].replace("'"," ")
        job["description"]=job["description"].replace("\n","<br>")
        job["description"]=job["description"].replace('\"',"")
        job["qualifications"]=job["qualifications"].replace("'"," ")
        job["qualifications"]=job["qualifications"].replace("\n","<br>")
        job["qualifications"]=job["qualifications"].replace("\\","")
        job["qualifications"]=job["qualifications"].replace('{"'," ")
        job["qualifications"]=job["qualifications"].replace('"}'," ")
        job["qualifications"]=job["qualifications"].replace('"'," ")
        jobsList.append(job)
    jobs = json.dumps(jobsList)
    closeConnection(con)
    return render_template('jobs.html', jobs=jobs)  
    
@jobs_bp.route("/jobs", methods=["POST"])
def handle_post_request():
    data = request.get_json()
    if(data['action']=="save job"):
        saveJob(data['sentData'][0],data['sentData'][1])
    return data
