from app.dbConnections import openConnection, closeConnection     
from app.main.queries import GET_USER_DETAILS

def getUserData(data):
     con=openConnection()
     curs=con.cursor()
     try:
          res = curs.execute(GET_USER_DETAILS,(data,))
          res = curs.fetchone()
          closeConnection(con)
          return res
     except Exception as e:
          print(f"Error: {e}")
          # Rollback changes in case of an error
          con.rollback() 
   