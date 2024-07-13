from app.models.job import Job
from app.utils import remove_special_chars,get_query_exec
from .queries import GET_ALL_JOBS

def get_all_jobs(user_id):
    params=[user_id,user_id]
    rows = get_query_exec(GET_ALL_JOBS,params)
    if(rows is None):
            return "Error: GET_ALL_JOBS query failed",400
    Jobs=[]
    for row in rows:
        title= remove_special_chars(row[0])
        location=row[1]
        description=remove_special_chars(row[2])
        qualifications=remove_special_chars(row[3])
        date=row[4]
        link=row[5]
        company=row[6]
        image=row[7]
        id=row[8]
        saved=row[9]
        applied=row[10]
        job = Job(title,location,description,qualifications, date,link,company,image,id,saved,applied)
        job = job.__dict__
        Jobs.append(job)  
    return Jobs,None  
    
