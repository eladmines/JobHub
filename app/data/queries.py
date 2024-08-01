INSERT_JOBS = """INSERT INTO jobs (job_title, job_location, job_description, job_qualifications, job_date, job_link, job_company)
VALUES (%s, %s, %s, %s, %s, %s, %s)
ON CONFLICT DO NOTHING
RETURNING job_link;"""
