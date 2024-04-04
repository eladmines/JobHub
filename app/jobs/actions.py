from dbConnections import openConnection, closeConnection     
from jobs.dbCommands import SAVE_JOB

def saveJob(data):
     con=openConnection()
     curs=con.cursor()
     try:
          curs.execute(SAVE_JOB,(data[1],data[0]))
          con.commit() 
     except Exception as e:
          print(f"Error: {e}")
          # Rollback changes in case of an error
          con.rollback() 