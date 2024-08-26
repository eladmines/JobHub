from app.dbConnections import open_connection
from app.login.queries import USER_AUTHENTICATION
import bcrypt
from sqlalchemy import text
import jwt
from flask import jsonify
from app.config import SECRET_KEY
def authentication(email, password):
    try:
        con = open_connection()
        query = text(USER_AUTHENTICATION)
        result = con.execute(query, {"email": email})
        print("result",result)
        user = result.fetchone()
        print("user",user)
        if user:
            decode_password = user[4]
            print("decode_password", decode_password)
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
    print("inside check_password", password, hashed)
    res = bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))
    print ("res hash", res)
    return res
