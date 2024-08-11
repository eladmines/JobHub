from app.dbConnections import open_connection, close_connection
from app.login.queries import USER_AUTHENTICATION
import bcrypt
from sqlalchemy import text

def authentication(email: str, password: str):
    try:
        con = open_connection()
        query = text(USER_AUTHENTICATION)
        result = con.execute(query, {"email": email})
        user = result.fetchone()
        
        if user:
            decode_password = user[4]
            is_password_correct = check_password(password, decode_password)
            
            if is_password_correct:
                return user
        return False
    
    except Exception as e:
        print(f"Error: {e}")
        return False
    
   

def check_password(password: str, hashed: str) -> bool:
    # Check if the provided password matches the hashed password
    return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))
