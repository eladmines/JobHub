CREATE_JOBS_TABLE=("CREATE TABLE IF NOT EXISTS Jobs (jobTitle TEXT,jobLocation TEXT, jobDescription TEXT,jobQualifications TEXT,jobDate TEXT, jobLink TEXT, jobCompany TEXT, image TEXT);")
INSERT_JOBS = """INSERT INTO jobs (jobTitle,jobLocation, jobDescription,jobQualifications,jobDate, jobLink, jobCompany, image)
VALUES (%s, %s, %s, %s, %s, %s, %s,%s);"""