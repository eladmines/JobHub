
from dbConnections import openConnection, closeConnection

def generate_insert_query(data):
     con=openConnection()
     curs=con.cursor()
     insertUser = "INSERT INTO users (firstName, lastName, email, password, role, company) " \
                   "VALUES (%s, %s, %s, %s, %s, %s);"
     values=(data['firstName'], data['lastName'], data['email'],
              data['inputPassword'], data['role'], data['company'])
     curs.execute(insertUser,values)
     con.commit()

    