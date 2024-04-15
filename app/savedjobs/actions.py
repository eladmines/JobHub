from dbConnections import openConnection, closeConnection     
from savedjobs.queries import GET_SAVED_JOBS

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