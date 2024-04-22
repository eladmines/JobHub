from dbConnections import openConnection, closeConnection     
from savedjobs.queries import GET_SAVED_JOBS,REMOVE_SAVED_JOB
import json
def getSavedJobs(data):
     con=openConnection()
     curs=con.cursor()
     try:
          curs.execute(GET_SAVED_JOBS,(data['sentData'],))
          data = curs.fetchone()[0]
          print(data)
          return data
     except Exception as e:
          print(f"Error: {e}")
          # Rollback changes in case of an error
          con.rollback() 

def removeSavedJob(data):
     con=openConnection()
     curs=con.cursor()
     try:
          curs.execute(GET_SAVED_JOBS,(data['sentData'],))
          data = curs.fetchone()[0]
          data = list(data)
          for item in data:
               res = json.loads(item)
              
          return data
     except Exception as e:
          print(f"Error: {e}")
          # Rollback changes in case of an error
          con.rollback() 