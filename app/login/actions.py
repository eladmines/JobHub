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
        logging.basicConfig(filename='app.log', level=logging.DEBUG)
        logging.debug('This is a debug message with result1: %s', result)

        user = result.fetchone()
        logging.debug('This is a debug message with result2: %s', user)

        if user:
            decode_password = user[4]
            logging.debug('This is a debug message with result3: %s', decode_password)

            is_password_correct = check_password(password, decode_password)
            if is_password_correct:
                token = jwt.encode({ 'user_id': user[0]},SECRET_KEY, algorithm='HS256')
                return jsonify({'token': token})
        return False
    
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({False})
    
   

def check_password(password: str, hashed: str) -> bool:
    # Check if the provided password matches the hashed password
    logging.debug('This is a debug message with result3: %s %s', password,hashed)
    res = bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))
    logging.debug('This is a debug message with result3: %s', res)
    return res
