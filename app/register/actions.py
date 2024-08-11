
from app.dbConnections import open_connection, close_connection
from app.register.queries import REGISTER_USER
import bcrypt
from sqlalchemy import text

FIRST_NAME='firstName'; LAST_NAME='lastName';EMAIL='email';PASSWORD='inputPassword';ROLE='role';COMPANY='company';EXPERIENCE='experience';SKILLS='skills'

def register_user(user):
     con=open_connection()
     try:
          values = {
            'firstName': user.get_firstname(),
            'lastName': user.get_lastname(),
            'email': user.get_email(),
            'password': user.get_password(),
            'role': user.get_role(),
            'company': user.get_company(),
            'experience': user.get_experience(),
            'skills': user.get_skills()
        }
          query = text(REGISTER_USER)
          res = con.execute(query,values)
          res.fetchone()
          if res.rowcount > 0:   
               con.commit()
               close_connection(con)
               return True
     except Exception as e:
          print(f"Error: {e}")
          # Rollback changes in case of an error
          con.rollback() 
          close_connection(con)
          return False
     

def hash_password(password):
     salt = bcrypt.gensalt()
     hashed = bcrypt.hashpw(password.encode('utf-8'),salt)
     return hashed.decode('utf-8')