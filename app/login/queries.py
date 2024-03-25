          
CHECK_LOGIN_DETAILS= "SELECT EXISTS (SELECT 1 FROM users WHERE email=%s and password=%s)"
GET_USER_DETAILS="SELECT * FROM users WHERE email=%s and password=%s"

    