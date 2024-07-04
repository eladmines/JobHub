from app.dbConnections import open_connection, close_connection     
from app.savedjobs.queries import GET_SAVED_JOBSIDS,GET_SAVED_JOBS,DELETE_SAVED_JOB
from app.models.job import Job
from app.utils import query_exec
from app.savedjobs.queries import SAVE_JOB

def get_saved_jobs_ids(userId):
    con=open_connection()
    curs=con.cursor()
    curs.execute(GET_SAVED_JOBSIDS,(userId,))
    jobsIds=curs.fetchall()
    jobsIds = [x[0] for x in jobsIds]
    return jobsIds

def get_saved_jobs(data):
     con=open_connection()
     curs=con.cursor()
     try:
          user_id=data['sentData']
          jobsId=get_saved_jobs_ids(user_id)
          Jobs=[]
          for item in jobsId:
               curs.execute(GET_SAVED_JOBS,(item,))
               job = curs.fetchone()
               job = Job(job[0],job[1],job[2],job[3], job[4],job[5],job[6],job[7],job[8])
               Jobs.append(job)
          close_connection(con)
          return Jobs
     except Exception as e:
          print(f"Error: {e}")
          # Rollback changes in case of an error
          con.rollback()
          close_connection(con) 


def remove_saved_job(data):
     con=open_connection()
     curs=con.cursor()
     try:
          user_id=(data['sentData'][0])
          jobId=str(data['sentData'][1])
          curs.execute(DELETE_SAVED_JOB,(user_id,jobId))
          con.commit()
          close_connection(con) 
          return data
     except Exception as e:
          print(f"Error: {e}")
          # Rollback changes in case of an error
          con.rollback() 
          close_connection(con)

def save_job(userId,jobId):
    query_exec(userId,jobId,SAVE_JOB)



