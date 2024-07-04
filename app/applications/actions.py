from app.dbConnections import open_connection, close_connection    
from app.applications.queries import GET_APPLICATIONS_JOBSIDS,GET_APPLICATED_JOBS,SAVE_JOB_APPLICATION,DELETE_APPLICATION
from app.models.job import Job
from app.utils import query_exec

def get_applications_ids(userId):
    con=open_connection()
    curs=con.cursor()
    curs.execute(GET_APPLICATIONS_JOBSIDS,(userId,))
    jobsIds=curs.fetchall()
    jobsIds = [(item[0], f"{item[1].year}-{item[1].month:02}-{item[1].day:02}")  for item in jobsIds]
    return jobsIds

def get_applications(data):
     con=open_connection()
     curs=con.cursor()
     try:
          user_id=data['sentData']
          applicationsId=get_applications_ids(user_id)
          Jobs=[]
          for item in applicationsId:
               curs.execute(GET_APPLICATED_JOBS,(item[0],))
               job = curs.fetchone()
               job = Job(job[0],job[1],job[2],job[3], job[4],job[5],job[6],job[7],job[8])
               job = vars(job)
               job["applied"]=item[1]
               Jobs.append(job)
          close_connection(con)
          return Jobs
     except Exception as e:
          print(f"Error: {e}")
          close_connection(con) 

def save_application(userId,jobId):
    query_exec(userId,jobId,SAVE_JOB_APPLICATION)

def remove_application(data):
     con=open_connection()
     curs=con.cursor()
     try:
          user_id=(data['sentData'][0])
          jobId=str(data['sentData'][1])
          curs.execute(DELETE_APPLICATION,(user_id,jobId))
          con.commit()
          close_connection(con) 
          return data
     except Exception as e:
          print(f"Error: {e}")
          # Rollback changes in case of an error
          con.rollback() 
          close_connection(con)