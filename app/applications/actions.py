from app.dbConnections import openConnection, closeConnection     
from app.applications.queries import GET_APPLICATIONS_JOBSIDS,GET_APPLICATED_JOBS
from app.models.job import Job
from app.utils import queryExec
from app.applications.queries import SAVE_JOB_APPLICATION,DELETE_APPLICATION

def getApplicationsIds(userId):
    con=openConnection()
    curs=con.cursor()
    curs.execute(GET_APPLICATIONS_JOBSIDS,(userId,))
    jobsIds=curs.fetchall()
    jobsIds = [x[0] for x in jobsIds]
    return jobsIds

def getApplications(data):
     con=openConnection()
     curs=con.cursor()
     try:
          user_id=data['sentData']
          applicationsId=getApplicationsIds(user_id)
          Jobs=[]
          for item in applicationsId:
               curs.execute(GET_APPLICATED_JOBS,(item,))
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
def saveApplication(userId,jobId):
    queryExec(userId,jobId,SAVE_JOB_APPLICATION)

def removeApplication(data):
     con=openConnection()
     curs=con.cursor()
     try:
          user_id=(data['sentData'][0])
          jobId=str(data['sentData'][1])
          curs.execute(DELETE_APPLICATION,(user_id,jobId))
          con.commit()
          closeConnection(con) 
          return data
     except Exception as e:
          print(f"Error: {e}")
          # Rollback changes in case of an error
          con.rollback() 
          closeConnection(con)