from dbConnections import openConnection, closeConnection     
from queries import CHECK_EMAIL_EXISTS
def checkLoginDetails(data):
     con=openConnection()
     curs=con.cursor()
     try:
          values=(data['email'],data['password'])
          curs.execute(CHECK_EMAIL_EXISTS,(values[0],values[1]))
          exists = curs.fetchone()[0]
          if (exists == True):
               return True
          else:
               return False   
     except Exception as e:
          print(f"Error: {e}")
          # Rollback changes in case of an error
          con.rollback() 
   