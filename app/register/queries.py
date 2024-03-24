
from dbConnections import openConnection, closeConnection
INSERT_USER = "INSERT INTO users (email,firstName,lastName,password, role, company) " \
                    "VALUES (%s, %s, %s, %s, %s, %s)"
                    
CHECK_EMAIL_EXISTS = "SELECT EXISTS (SELECT 1 FROM users WHERE email=%s)"


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
   

    