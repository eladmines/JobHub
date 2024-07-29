GET_APPLICATIONS_JOBSIDS="""SELECT job_id,date FROM jobs_applicated WHERE user_id=%s"""

GET_APPLICATED_JOBS="""SELECT * FROM jobs WHERE id=%s"""

SAVE_JOB_APPLICATION = """
INSERT INTO 
    jobs_applicated (user_id,job_id)
VALUES (%s,%s)
ON CONFLICT (user_id,job_id) DO NOTHING
"""

DELETE_APPLICATION="DELETE FROM jobs_applicated WHERE user_id=%s AND job_id=%s"

GET_NUM_OF_APPLICATIONS_TODAY="""
SELECT 
    COUNT(*) AS row_count 
FROM 
    jobs_applicated where user_id=%s and date=CURRENT_DATE"""

GET__NUM_APPLICATIONS_THIS_WEEK="""
SELECT 
    COUNT(*)
FROM 
    jobs_applicated 
WHERE 
    user_id=%s AND date >= date_trunc('week', CURRENT_DATE) AND date < date_trunc('week', CURRENT_DATE) + INTERVAL '1 week'; """
  

GET__NUM_APPLICATIONS_THIS_MONTH="""
SELECT 
    COUNT(*)
FROM 
    jobs_applicated
WHERE 
    user_id=%s AND date >= date_trunc('month', CURRENT_DATE)  AND date < date_trunc('month', CURRENT_DATE) + INTERVAL '1 month'; """
 


GET_NUM_OF_APPLICATIONS_BY_MONTH="""
SELECT 
    EXTRACT(YEAR FROM date) AS year,
    EXTRACT(MONTH FROM date) AS month,
    COUNT(*) AS rows_inserted
FROM 
    jobs_applicated
WHERE 
    user_id = %s
GROUP BY 
    EXTRACT(YEAR FROM date), EXTRACT(MONTH FROM date)
ORDER BY 
    year, month;
"""


GET_ALL_APPLICATIONS="""SELECT 
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
    (jobs_applicated.job_id IS NOT NULL AND jobs_applicated.job_id = jobs.job_id)
    ;
"""


GET_PROCESSES_APPLICATION="""
SELECT * FROM processes_application WHERE user_id=%s and job_id=%s
"""

DELETE_PROCESS_APPLICATION="DELETE FROM processes_application WHERE id=%s"

SAVE_PROCESS="""INSERT INTO processes_application (user_id, job_id, date, interviewer, phone, subject, description)
VALUES (%s, %s, TO_DATE(%s, 'DD-MM-YYYY'), %s, %s, %s, %s)
"""