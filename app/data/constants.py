url = "https://jobs.careers.microsoft.com/global/en/search?et=Internship&l=en_us&pg=1&pgSz=20&o=Relevance&flt=true"
DATABASE_URL="postgres://njbfbloq:O2eskQEEPaRKJX16XXKYi18WdeslSXx7@snuffleupagus.db.elephantsql.com/njbfbloq"
CREATE_JOBS_TABLE=("CREATE TABLE IF NOT EXISTS Jobs (jobTitle TEXT,jobLocation TEXT, jobDescription TEXT,jobQualifications TEXT,jobDate TEXT, jobLink TEXT, jobCompany TEXT, image TEXT);")
INSERT_ROOMS = """INSERT INTO jobs (jobTitle,jobLocation, jobDescription,jobQualifications,jobDate, jobLink, jobCompany, image)
VALUES (%s, %s, %s, %s, %s, %s, %s,%s);"""