from dbConnections import openConnection, closeConnection     
from savedjobs.queries import GET_SAVED_JOBS,REMOVE_SAVED_JOB
import json
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
          curs.execute(GET_SAVED_JOBS,(data['sentData'][0],))
          savedJobs = curs.fetchone()[0]
          link = data['sentData'][2]
          savedJobs = list(savedJobs)
          for item in savedJobs:
               res = json.loads(item)
               if res['link'] == link:
                    savedJobs.remove(item)
          savedJobs = json.dumps(savedJobs)
          curs.execute(REMOVE_SAVED_JOB,(savedJobs,data['sentData'][0],))
          con.commit() 
          curs.execute(GET_SAVED_JOBS,(data['sentData'][0],))
          savedJobs = curs.fetchone()[0]
          return data
     except Exception as e:
          print(f"Error: {e}")
          # Rollback changes in case of an error
          con.rollback() 