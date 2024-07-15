GET_SAVED_JOBSIDS="SELECT job_id FROM jobs_saved WHERE user_id=%s"

GET_SAVED_JOBS="SELECT * FROM jobs WHERE id=%s"

DELETE_SAVED_JOB="DELETE FROM jobs_saved WHERE user_id=%s AND job_id=%s"

GET_NUM_OF_SAVED_JOBS="""SELECT COUNT(*) AS row_count FROM jobs_saved where user_id=%s"""

SAVE_JOB = """
INSERT INTO jobs_saved (user_id,job_id)
VALUES (%s,%s)
ON CONFLICT (user_id,job_id) DO NOTHING
"""

GET_ALL_SAVED_JOBS="""SELECT 
    jobs.*,
    CASE WHEN jobs_saved.job_id IS NOT NULL THEN 1 ELSE 0 END AS saved,
    jobs_applicated.date AS applicated_date
FROM 
    jobs
LEFT JOIN 
    jobs_saved ON jobs.job_id = jobs_saved.job_id AND jobs_saved.user_id = %s
LEFT JOIN 
    jobs_applicated ON jobs.job_id = jobs_applicated.job_id AND jobs_applicated.user_id = %s
WHERE 
    (jobs_saved.job_id IS NOT NULL AND jobs_saved.job_id = jobs.job_id)
    ;
"""