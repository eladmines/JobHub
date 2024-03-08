
from dbConnections import openConnection, closeConnection
INSERT_USER = "INSERT INTO users (firstName, lastName, email, password, role, company) " \
                    "VALUES (%s, %s, %s, %s, %s, %s);"

def generate_insert_query(data):
     con=openConnection()
     curs=con.cursor()
     try:
          values=(data['firstName'], data['lastName'], data['email'],
          data['inputPassword'], data['role'], data['company'])
          curs.execute(INSERT_USER,values)
          con.commit()
     except Exception as e:
          print(f"Error: {e}")
          # Rollback changes in case of an error
          con.rollback() 
   

    