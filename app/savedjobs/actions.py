from app.dbConnections import openConnection, closeConnection     
from app.savedjobs.queries import GET_SAVED_JOBS,REMOVE_SAVED_JOB,INIT_EMPTY_SAVEDJOBS_ARR
def getSavedJobs(data):
     con=openConnection()
     curs=con.cursor()
     try:
          curs.execute(GET_SAVED_JOBS,(data['sentData'],))
          data = curs.fetchone()[0]
          return data
     except Exception as e:
          print(f"Error: {e}")
          # Rollback changes in case of an error
          con.rollback() 

def removeSavedJob(data):
     con=openConnection()
     curs=con.cursor()
     try:
          email=(data['sentData'][0])
          jobId=str(data['sentData'][1])
          curs.execute(REMOVE_SAVED_JOB,(jobId,email))
          con.commit() 
          curs.execute(INIT_EMPTY_SAVEDJOBS_ARR,(email,))
          con.commit() 
          return data
     except Exception as e:
          print(f"Error: {e}")
          # Rollback changes in case of an error
          con.rollback() 