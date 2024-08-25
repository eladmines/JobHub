from app.dbConnections import open_connection, close_connection    
from app.applications.queries import GET_ALL_APPLICATIONS,SAVE_JOB_APPLICATION,DELETE_APPLICATION,GET_PROCESSES_APPLICATION,DELETE_PROCESS_APPLICATION,SAVE_PROCESS
from app.models.job import Job
from app.utils import save_query_exec,remove_special_chars,delete_query_exec,get_query_exec,get_id_by_token
from flask import jsonify

def get_applications(jwt):
    user_id = get_id_by_token(jwt)
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
    

def remove_application(user_id,application_to_delete):
     data={'user_id':user_id,'job_id':application_to_delete}
     delete_query_exec(DELETE_APPLICATION,data)

def get_applications_processes(user_id,job_id):
    user_id = get_id_by_token(user_id)
    data={'user_id':user_id,'job_id':job_id}
    rows=get_query_exec(GET_PROCESSES_APPLICATION,data)
    return rows,None 

def remove_process_application(data):
     data={'id':data}
     delete_query_exec(DELETE_PROCESS_APPLICATION,data)

     
def save_process(data):
    return save_query_exec(SAVE_PROCESS,data)