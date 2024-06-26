from app.models.job import Job
from .queries import GET_ALL_JOBS

def getAllJobs(curs):
    curs.execute(GET_ALL_JOBS)
    Jobs=[]
    rows = curs.fetchall()
    for row in rows:
        title=row[0]
        location=row[1]
        description=row[2]
        qualifications=row[3]
        date=row[4]
        link=row[5]
        company=row[6]
        image=row[7]
        id=row[8]
        job = Job(title,location,description,qualifications, date,link,company,image,id)
        Jobs.append(job)    
    return Jobs
