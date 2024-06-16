#CHECK_LOGIN_DETAILS= "SELECT EXISTS (SELECT 1 FROM users WHERE email=%s and password=%s)"
CHECK_LOGIN_DETAILS="SELECT id FROM users WHERE email = %s AND password = %s"
