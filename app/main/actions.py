from app.dbConnections import openConnection, closeConnection     
from app.main.queries import GET_USER_DETAILS,GET_NUM_OF_SAVED_JOBS

def getUserData(data):
     con=openConnection()
     curs=con.cursor()
     try:
          res = curs.execute(GET_USER_DETAILS,(data,))
          res = curs.fetchone()
          savedJobsCounter = curs.execute(GET_NUM_OF_SAVED_JOBS,(res[0],))
          savedJobsCounter = curs.fetchone()
          res = res + savedJobsCounter
          closeConnection(con)
          return res
     except Exception as e:
          print(f"Error: {e}")
          # Rollback changes in case of an error
          con.rollback() 
   