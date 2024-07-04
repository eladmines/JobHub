
from app.dbConnections import open_connection, close_connection
from app.register.queries import REGISTER_USER
from app.models.user import User
FIRST_NAME='firstName'; LAST_NAME='lastName';EMAIL='email';PASSWORD='inputPassword';ROLE='role';COMPANY='company';EXPERIENCE='experience';SKILLS='skills'

def register_user(user):
     con=open_connection()
     curs=con.cursor()
     try:
          values=(user.get_firstname(), user.get_lastname(), user.get_email(),
          user.get_password(), user.get_role(), user.get_company(),user.get_experience(),user.get_skills())
          curs.execute(REGISTER_USER,values)
          curs.fetchone()
          if(curs.rowcount > 0):   
               con.commit()
               close_connection(con)
               return True
     except Exception as e:
          print(f"Error: {e}")
          # Rollback changes in case of an error
          con.rollback() 
          close_connection(con)
          return False
     

    