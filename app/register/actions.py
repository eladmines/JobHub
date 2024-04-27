
from dbConnections import openConnection, closeConnection
from register.queries import CHECK_EMAIL_EXISTS,INSERT_USER
FIRST_NAME='firstName'
LAST_NAME='lastName'
EMAIL='email'
PASSWORD='inputPassword'
ROLE='role'
COMPANY='company'

def generate_insert_query(data):
     #
     con=openConnection()
     curs=con.cursor()
     try:
          values=(data[FIRST_NAME], data[LAST_NAME], data[EMAIL],
          data[PASSWORD], data[ROLE], data[COMPANY])
          print(data)
          curs.execute(CHECK_EMAIL_EXISTS,(values[2],))
          exists = curs.fetchone()[0]
          if (exists == False):
               curs.execute(INSERT_USER,values)
               con.commit()
               return True
          else:
               return False   
     except Exception as e:
          print(f"Error: {e}")
          # Rollback changes in case of an error
          con.rollback() 
   

    