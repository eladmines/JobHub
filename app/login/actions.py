from app.dbConnections import open_connection, close_connection     
from app.login.queries import USER_AUTHENTICATION

def authentication(username,password):
     try:
          con=open_connection()
          curs=con.cursor()
          values=(username,password)
          curs.execute(USER_AUTHENTICATION,values)
          user=curs.fetchone()
          if(curs.rowcount > 0):   
               close_connection(con)
               return user
     except Exception as e:
          print(f"Error: {e}")
          close_connection(con)
          return False