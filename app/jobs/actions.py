from app.dbConnections import openConnection, closeConnection     
from app.jobs.queries import SAVE_JOB
import json
from app.models.job import Job
from .queries import GET_ALL_JOBS

def getAllJobs(con,curs):
    curs.execute(GET_ALL_JOBS)
    con.commit()
    rowCounter=0
    Jobs=[]
    row = curs.fetchone()
    while row is not None:
        job = Job(row[0],row[1],row[2],row[3], row[4],row[5],row[6],row[7],row[8])
        Jobs.append(job)
        rowCounter = rowCounter + 1
        row = curs.fetchone()
    return Jobs

# def saveJob(email,data,id):
#      con=openConnection()
#      curs=con.cursor()
#      try:
#           curs.execute(SAVE_JOB,(id,data,email))
#           con.commit() 
#           con=closeConnection()
#      except Exception as e:
#           print(f"Error: {e}")
#           # Rollback changes in case of an error
#           con.rollback()


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