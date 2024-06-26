from app.dbConnections import openConnection, closeConnection     
from app.savedjobs.queries import GET_SAVED_JOBSIDS,GET_SAVED_JOBS,DELETE_SAVED_JOB
from app.models.job import Job
from app.utils import queryExec
from app.savedjobs.queries import SAVE_JOB

def GetSavedJobsIds(userId):
    con=openConnection()
    curs=con.cursor()
    curs.execute(GET_SAVED_JOBSIDS,(userId,))
    jobsIds=curs.fetchall()
    jobsIds = [x[0] for x in jobsIds]
    return jobsIds

def getSavedJobs(data):
     con=openConnection()
     curs=con.cursor()
     try:
          user_id=data['sentData']
          jobsId=GetSavedJobsIds(user_id)
          Jobs=[]
          for item in jobsId:
               curs.execute(GET_SAVED_JOBS,(item,))
               job = curs.fetchone()
               job = Job(job[0],job[1],job[2],job[3], job[4],job[5],job[6],job[7],job[8])
               Jobs.append(job)
          closeConnection(con)
          return Jobs
     except Exception as e:
          print(f"Error: {e}")
          # Rollback changes in case of an error
          con.rollback()
          closeConnection(con) 


def removeSavedJob(data):
     con=openConnection()
     curs=con.cursor()
     try:
          user_id=(data['sentData'][0])
          jobId=str(data['sentData'][1])
          curs.execute(DELETE_SAVED_JOB,(user_id,jobId))
          con.commit()
          closeConnection(con) 
          return data
     except Exception as e:
          print(f"Error: {e}")
          # Rollback changes in case of an error
          con.rollback() 
          closeConnection(con)

def saveJob(userId,jobId):
    queryExec(userId,jobId,SAVE_JOB)



