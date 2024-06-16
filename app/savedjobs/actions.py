from app.dbConnections import openConnection, closeConnection     
from app.savedjobs.queries import GET_SAVED_JOBSIDS,GET_SAVED_JOBS,DELETE_SAVED_JOB,SAVE_COMMENT,GET_COMMENTS
from app.models.job import Job
from flask import jsonify

def getSavedJobs(data):
     con=openConnection()
     curs=con.cursor()
     try:
          user_id=data['sentData']
          curs.execute(GET_SAVED_JOBSIDS,(user_id,))
          data = curs.fetchall()
          jobsIds=[item[0] for item in data]
          Jobs=[]
          for item in jobsIds:
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


def saveComment(user_id,data,job_id):
     con=openConnection()
     curs=con.cursor()
     try:
          curs.execute(SAVE_COMMENT,(data,job_id,user_id))
          con.commit() 
          closeConnection(con)
          return jsonify(True)
     except Exception as e:
          print(f"Error: {e}")
          # Rollback changes in case of an error
          con.rollback()
          closeConnection(con)
          return jsonify(False)


def getComments(user_id,job_id):
     con=openConnection()
     curs=con.cursor()
     try:
          curs.execute(GET_COMMENTS,(user_id,job_id))
          con.commit() 
          res = curs.fetchall()
          closeConnection(con)
          return res
     except Exception as e:
          print(f"Error: {e}")
          # Rollback changes in case of an error
          con.rollback()
          closeConnection(con)