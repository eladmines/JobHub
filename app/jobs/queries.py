GET_ALL_JOBS = """
SELECT 
    jobs.*,
    CASE WHEN jobs_saved.job_id IS NOT NULL THEN 1 ELSE 0 END AS saved,
    jobs_applicated.date AS applicated_date
FROM 
    jobs
LEFT JOIN 
    jobs_saved ON jobs.job_id = jobs_saved.job_id AND jobs_saved.user_id = %s
LEFT JOIN 
    jobs_applicated ON jobs.job_id = jobs_applicated.job_id AND jobs_applicated.user_id = %s;
"""


