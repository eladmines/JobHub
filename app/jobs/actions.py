from app.models.job import Job
from app.utils import remove_special_chars,get_query_exec
from .queries import GET_ALL_JOBS

def get_all_jobs(user_id):
    params={"user_id":user_id}
    rows = get_query_exec(GET_ALL_JOBS,params)
    if rows is None:
            return "Error: GET_ALL_JOBS query failed",400
    Jobs=[]
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
    
