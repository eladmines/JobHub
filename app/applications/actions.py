from app.dbConnections import open_connection, close_connection    
from app.applications.queries import GET_ALL_APPLICATIONS,SAVE_JOB_APPLICATION,DELETE_APPLICATION
from app.models.job import Job
from app.utils import save_query_exec,remove_special_chars,delete_query_exec,get_query_exec
from flask import jsonify

def get_applications(data):
    data=(data,data)
    rows=get_query_exec(GET_ALL_APPLICATIONS,data)
    applications = []
    for row in rows:
        title= remove_special_chars(row['job_title'])
        location=row['job_location']
        description=remove_special_chars(row['job_description'])
        qualifications=remove_special_chars("")
        date=row['job_date']
        link=row['job_link']
        company=row['job_company']
        id=row['job_id']
        saved=row['saved']
        applied=row['applicated_date']
        job = Job(title,location,description,qualifications, date,link,company,id,saved,applied)
        job = job.__dict__
        applications.append(job)  
    return applications,None 

def save_application(data):
    save_query_exec(SAVE_JOB_APPLICATION,data)
    

def remove_application(data):
     delete_query_exec(DELETE_APPLICATION,data)