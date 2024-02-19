from flask import  render_template, redirect, jsonify
from jobs import jobs_bp
from config import DATABASE_URL
from models.job import Job
from .dbCommands import getAllJobsDBCommand
import psycopg2
import json

def openConnection():
    try:
        conn = psycopg2.connect(DATABASE_URL)
    except psycopg2.OperationalError as e:
        print('Unable to connect!\n{0}'.format(e))  
        # Return None or raise an exception here based on your requirement
        return None
    else:
        print("Succesful") 
        return conn

def closeConnection(con):
    try:
        con.close()
    except Exception as e:
        print('Error closing connection: {0}'.format(e))
    finally:
        print('Connection closed.') 

def getAllJobs(con,curs):
    curs.execute(getAllJobsDBCommand)
    con.commit()
    rowCounter=0
    Jobs=[]
    row = curs.fetchone()
    while row is not None:
        job = Job(row[0],row[1],row[2],row[3], row[4],row[5],row[6],row[7])
        Jobs.append(job)
        rowCounter = rowCounter + 1
        row = curs.fetchone()
        
    return Jobs

@jobs_bp.route("/jobs")
def create():
    con=openConnection()
    curs=con.cursor()
    Jobs = getAllJobs(con,curs)
    
    jobsList =[]
    for job in Jobs:
        job = vars(job)
        job["title"]=job["title"].replace("'"," ")
        job["description"]=job["description"].replace("'"," ")
        job["description"]=job["description"].replace("\n","\\n")
        job["qualifications"]=job["qualifications"].replace("'"," ")
        job["qualifications"]=job["qualifications"].replace("\n","\\n")
        job["qualifications"]=job["qualifications"].replace("\\","")
        job["qualifications"]=job["qualifications"].replace('{"'," ")
        job["qualifications"]=job["qualifications"].replace('"}'," ")
        job["qualifications"]=job["qualifications"].replace('"'," ")
        jobsList.append(job)
    
        
    jobs = json.dumps(jobsList)
    
    return render_template('jobs.html', jobs=jobs)  
    #closeConnection(con)
    