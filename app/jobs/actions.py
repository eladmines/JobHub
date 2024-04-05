from dbConnections import openConnection, closeConnection     
from jobs.queries import SAVE_JOB
import json
from models.job import Job
from .queries import GET_ALL_JOBS
def getAllJobs(con,curs):
    curs.execute(GET_ALL_JOBS)
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

def saveJob(email,data):
     con=openConnection()
     curs=con.cursor()
     try:
          stringData = json.dumps(data)
          print(type(stringData))
          curs.execute(SAVE_JOB,(stringData,email))
          con.commit() 
     except Exception as e:
          print(f"Error: {e}")
          # Rollback changes in case of an error
          con.rollback()