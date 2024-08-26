from app.dbConnections import open_connection
from app.login.queries import USER_AUTHENTICATION
import bcrypt
from sqlalchemy import text
import jwt
from flask import jsonify
from app.config import SECRET_KEY
import logging
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
                token = jwt.encode({ 'user_id': user[0]},SECRET_KEY, algorithm='HS256')
                return token
        return False
    
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({False})
    
   

def check_password(password: str, hashed: str) -> bool:
    res = bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))
    return res
