  
from app.savedjobs.queries import DELETE_SAVED_JOB,GET_ALL_SAVED_JOBS
from app.models.job import Job
from app.utils import remove_special_chars,save_query_exec,delete_query_exec,get_query_exec,get_id_by_token
from app.savedjobs.queries import SAVE_JOB

def get_saved_jobs(jwt):
    user_id = get_id_by_token(jwt)
    data={'user_id':user_id}
    rows=get_query_exec(GET_ALL_SAVED_JOBS,data)
    Jobs = []
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
        Jobs.append(job)  
    return Jobs,None 

def remove_saved_job(user_id,job_to_delete):
     data={"user_id":user_id,"job_id":job_to_delete}
     delete_query_exec(DELETE_SAVED_JOB,data)

def save_job(user_id,job_id):
    data={'user_id':user_id,'job_id':job_id}
    save_query_exec(SAVE_JOB,data)



