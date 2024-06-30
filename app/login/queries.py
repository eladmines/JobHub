#CHECK_LOGIN_DETAILS= "SELECT EXISTS (SELECT 1 FROM users WHERE email=%s and password=%s)"
USER_AUTHENTICATION="SELECT * FROM users WHERE email = %s AND password = %s"
