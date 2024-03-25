from dbConnections import openConnection, closeConnection     
from main.queries import GET_USER_DETAILS

def getUserData(data):
     con=openConnection()
     curs=con.cursor()
     try:
          print(data)
          res = curs.execute("SELECT * FROM users WHERE email=%s",(data,))
          res = curs.fetchone()
          return res
     except Exception as e:
          print(f"Error: {e}")
          # Rollback changes in case of an error
          con.rollback() 
   