url = "https://jobs.careers.microsoft.com/global/en/search?et=Internship&l=en_us&pg=1&pgSz=20&o=Relevance&flt=true"
CREATE_JOBS_TABLE=("CREATE TABLE IF NOT EXISTS Jobs (jobTitle TEXT,jobLocation TEXT, jobDescription TEXT,jobQualifications TEXT,jobDate TEXT, jobLink TEXT, jobCompany TEXT, image TEXT);")
INSERT_JOBS = """INSERT INTO jobs (jobTitle,jobLocation, jobDescription,jobQualifications,jobDate, jobLink, jobCompany, image)
VALUES (%s, %s, %s, %s, %s, %s, %s,%s);"""
ENDPOINT ="database-1.czkaa4kseikm.us-east-1.rds.amazonaws.com" 
DATABASE = "postgres"
USERNAME="jobby"
PASSWORD="12345678"
PORT="5432"

DATABASE_URL = f"host='{ENDPOINT}' dbname='{DATABASE}' user='{USERNAME}' password='{PASSWORD}' port='{PORT}'"