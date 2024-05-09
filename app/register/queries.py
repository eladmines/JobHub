INSERT_USER = "INSERT INTO users (firstName,lastName,email,password, role, company,savedjobs) " \
                    "VALUES (%s, %s, %s, %s, %s, %s,'[]')"              
CHECK_EMAIL_EXISTS = "SELECT EXISTS (SELECT 1 FROM users WHERE email=%s)"


    