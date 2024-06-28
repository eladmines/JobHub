INSERT_USER = """INSERT INTO users (firstName, lastName, email, password, role, company, experience, skills) 
VALUES (%s, %s, %s, %s, %s, %s, %s, %s) 
ON CONFLICT (email) DO NOTHING 
RETURNING id;"""



    