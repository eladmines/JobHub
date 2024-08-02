from app.dbConnections import open_connection, close_connection     
from app.login.queries import USER_AUTHENTICATION
import bcrypt
def authentication(username,password):
     try:
          con=open_connection()
          curs=con.cursor()
          values=(username,password)
          curs.execute(USER_AUTHENTICATION,(username,))
          user=curs.fetchone()
          decode_password=user[4]
          is_password_correct = check_password(values[1],decode_password)
          if is_password_correct:   
               close_connection(con)
               return user
     except Exception as e:
          print(f"Error: {e}")
          close_connection(con)
          return False
     
def check_password(password: str, hashed: str) -> bool:
    # Check if the provided password matches the hashed password
    return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))