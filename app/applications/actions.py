from app.dbConnections import open_connection, close_connection    
from app.applications.queries import GET_ALL_APPLICATIONS,SAVE_JOB_APPLICATION,DELETE_APPLICATION
from app.models.job import Job
from app.utils import save_query_exec,remove_special_chars,delete_query_exec
from flask import jsonify

def get_applications(data):
    con = open_connection()
    curs = con.cursor()
    try:
        Jobs = []
        user_id = data['sentData']
        curs.execute(GET_ALL_APPLICATIONS,(user_id))
        jobs = curs.fetchall()
        for job in jobs:
            job = Job(job[0], job[1], job[2], job[3], job[4], job[5], job[6], job[7], job[8],job[9],job[10])
            job = job.__dict__
            job["description"]=remove_special_chars(job["description"])
            Jobs.append(job)
        close_connection(con)
        return Jobs
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def save_application(data):
    save_query_exec(SAVE_JOB_APPLICATION,data)
    

def remove_application(data):
     delete_query_exec(DELETE_APPLICATION,data)