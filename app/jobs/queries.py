CREATE_JOBS_TABLE=("CREATE TABLE IF NOT EXISTS Jobs (id SERIAL PRIMARY KEY, jobTitle TEXT, jobDescription TEXT, jobCompany TEXT, image TEXT, date TIMESTAMP);")

GET_ALL_JOBS = """SELECT * FROM jobs"""

GET_USER="SELECT * FROM users WHERE email=%s"

SAVE_JOB = """
INSERT INTO jobs_saved (user_id,job_id)
VALUES (%s,%s)
ON CONFLICT (user_id,job_id) DO NOTHING
"""

SAVE_JOB_APPLICATION = """
INSERT INTO jobs_applicated (user_id,job_id)
VALUES (%s,%s)
ON CONFLICT (user_id,job_id) DO NOTHING
"""