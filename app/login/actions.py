from app.dbConnections import open_connection, close_connection
from app.login.queries import USER_AUTHENTICATION
import bcrypt
from sqlalchemy import text
import jwt
from datetime import datetime, timedelta
from flask import jsonify
import secrets

secret_key = secrets.token_hex(32)
def authentication(email, password):
    try:
        con = open_connection()
        query = text(USER_AUTHENTICATION)
        result = con.execute(query, {"email": email})
        user = result.fetchone()
        
        if user:
            decode_password = user[4]
            is_password_correct = check_password(password, decode_password)
            if is_password_correct:
                token = jwt.encode({ 'user_id': user[0], 'exp': datetime.utcnow() + timedelta(hours=1)},secret_key, algorithm='HS256')
                return jsonify({'token': token})
        return False
    
    except Exception as e:
        print(f"Error: {e}")
        return False
    
   

def check_password(password: str, hashed: str) -> bool:
    # Check if the provided password matches the hashed password
    return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))
