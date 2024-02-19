CREATE_JOBS_TABLE=("CREATE TABLE IF NOT EXISTS Jobs (id SERIAL PRIMARY KEY, jobTitle TEXT, jobDescription TEXT, jobCompany TEXT, image TEXT, date TIMESTAMP);")

getAllJobsDBCommand = """SELECT * FROM jobs"""