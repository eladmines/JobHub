CREATE_JOBS_TABLE=("CREATE TABLE IF NOT EXISTS Jobs (id SERIAL PRIMARY KEY, jobTitle TEXT, jobDescription TEXT, jobCompany TEXT, image TEXT, date TIMESTAMP);")

GET_ALL_JOBS = """SELECT * FROM jobs"""

GET_USER="SELECT * FROM users WHERE email=%s"

SAVE_JOB="""UPDATE users 
SET savedjobs = CASE 
                    WHEN EXISTS (
                        SELECT 1
                        FROM jsonb_array_elements(savedjobs) AS job
                        WHERE job->>'id' = '%s'
                    ) THEN savedjobs
                    ELSE savedjobs || %s::jsonb
                END
WHERE email = %s;"""
