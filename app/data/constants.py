url = "https://jobs.careers.microsoft.com/global/en/search?et=Internship&l=en_us&pg=1&pgSz=20&o=Relevance&flt=true"
#DATABASE_URL="arn:aws:rds:us-east-1:690292011599:db:database-1"
CREATE_JOBS_TABLE=("CREATE TABLE IF NOT EXISTS Jobs (jobTitle TEXT,jobLocation TEXT, jobDescription TEXT,jobQualifications TEXT,jobDate TEXT, jobLink TEXT, jobCompany TEXT, image TEXT);")
INSERT_JOBS = """INSERT INTO jobs (jobTitle,jobLocation, jobDescription,jobQualifications,jobDate, jobLink, jobCompany, image)
VALUES (%s, %s, %s, %s, %s, %s, %s,%s);"""
endpoint ="***" 
database = "***"
username="***"
password="***"
port="***"

DATABASE_URL = f"host='{endpoint}' dbname='{database}' user='{username}' password='{password}' port='{port}'"