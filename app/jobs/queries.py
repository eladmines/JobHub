CREATE_JOBS_TABLE=("CREATE TABLE IF NOT EXISTS Jobs (id SERIAL PRIMARY KEY, jobTitle TEXT, jobDescription TEXT, jobCompany TEXT, image TEXT, date TIMESTAMP);")

GET_ALL_JOBS = """SELECT * FROM jobs"""

GET_USER="SELECT * FROM users WHERE email=%s"

SAVE_JOB="UPDATE users SET array_column = array_column || ARRAY[%s] WHERE email  = %s"