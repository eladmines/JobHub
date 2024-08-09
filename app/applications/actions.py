from app.dbConnections import open_connection, close_connection    
from app.applications.queries import GET_ALL_APPLICATIONS,SAVE_JOB_APPLICATION,DELETE_APPLICATION,GET_PROCESSES_APPLICATION,DELETE_PROCESS_APPLICATION,SAVE_PROCESS
from app.models.job import Job
from app.utils import save_query_exec,remove_special_chars,delete_query_exec,get_query_exec
from flask import jsonify

def get_applications(user_id):
    user_id={'user_id':user_id}
    rows=get_query_exec(GET_ALL_APPLICATIONS,user_id)
    
    applications = [
        Job(
            title=remove_special_chars(row['job_title']),
            location=row['job_location'],
            description=remove_special_chars(row['job_description']),
            qualifications=remove_special_chars(""),
            date=row['job_date'],
            link=row['job_link'],
            company=row['job_company'],
            id=row['job_id'],
            saved=row['saved'],
            applied=row['applicated_date']
        ).__dict__ for row in rows
    ]
    return applications,None 

def save_application(user_id,job_id):
    data={'user_id':user_id,'job_id':job_id}
    save_query_exec(SAVE_JOB_APPLICATION,data)
    

def remove_application(data):
     data={'user_id':data[0],'job_id':data[1]}
     delete_query_exec(DELETE_APPLICATION,data)

def get_applications_processes(user_id,job_id):
    data={'user_id':data[0],'job_id':data[1]}
    rows=get_query_exec(GET_PROCESSES_APPLICATION,data)
    return rows,None 

def remove_process_application(data):
     data={'id':data}
     delete_query_exec(DELETE_PROCESS_APPLICATION,data)

     
def save_process(data):
    data={'user_id':data[0],'job_id':data[1]}
    return save_query_exec(SAVE_PROCESS,data)