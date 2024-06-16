from app.dbConnections import openConnection, closeConnection     
from app.login.queries import CHECK_LOGIN_DETAILS

def checkLoginDetails(data):
     con=openConnection()
     curs=con.cursor()
     try:
          email=data['email']
          password=data['password']
          curs.execute(CHECK_LOGIN_DETAILS,(email,password))
          exists = curs.fetchone()[0]
          if exists:
               return exists
          else:
               return None  
     except Exception as e:
          print(f"Error: {e}")
          # Rollback changes in case of an error
          con.rollback() 
     closeConnection(con)
   