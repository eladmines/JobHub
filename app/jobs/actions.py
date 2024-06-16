from app.dbConnections import openConnection, closeConnection     
from app.jobs.queries import SAVE_JOB
from app.models.job import Job
from .queries import GET_ALL_JOBS

def removeSpecialChars(job):
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
    return job


def getAllJobs(con,curs):
    curs.execute(GET_ALL_JOBS)
    con.commit()
    rowCounter=0
    Jobs=[]
    row = curs.fetchone()
    while row is not None:
        print(row[1])
        job = Job(row[0],row[1],row[2],row[3], row[4],row[5],row[6],row[7],row[8])
        Jobs.append(job)
        rowCounter = rowCounter + 1
        row = curs.fetchone()
    return Jobs

def saveJob(userId,jobId):
     con=openConnection()
     curs=con.cursor()
     try:
          curs.execute(SAVE_JOB,(userId,jobId))
          con.commit() 
          closeConnection(con)
     except Exception as e:
          print(f"Error: {e}")
          # Rollback changes in case of an error
          con.rollback()