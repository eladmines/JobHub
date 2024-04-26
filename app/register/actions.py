
from dbConnections import openConnection, closeConnection
from register.actions import CHECK_EMAIL_EXISTS,INSERT_USER


def generate_insert_query(data):
     con=openConnection()
     curs=con.cursor()
     try:
          values=(data['firstName'], data['lastName'], data['email'],
          data['inputPassword'], data['role'], data['company'])
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
   

    