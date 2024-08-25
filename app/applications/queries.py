# Get job IDs and dates for applications by a user
GET_APPLICATIONS_JOBSIDS = """
SELECT job_id, date 
FROM jobs_applicated 
WHERE user_id = :user_id
"""

# Get details of a specific job application by job ID
GET_APPLICATED_JOBS = """
SELECT * 
FROM jobs 
WHERE id = :job_id
"""

# Save a job application, avoiding duplicates
SAVE_JOB_APPLICATION = """
INSERT INTO 
    jobs_applicated (user_id, job_id)
VALUES (:user_id, :job_id)
ON CONFLICT (user_id, job_id) DO NOTHING
"""

# Delete a job application by user ID and job ID
DELETE_APPLICATION = """
DELETE FROM jobs_applicated 
WHERE user_id = :user_id 
AND job_id = :job_id
"""

# Get the number of job applications made today by a user
GET_NUM_OF_APPLICATIONS_TODAY = """
SELECT 
    COUNT(*) AS row_count 
FROM 
    jobs_applicated 
WHERE 
    user_id = :user_id 
    AND date = CURRENT_DATE
"""

# Get the number of job applications made this week by a user
GET_NUM_APPLICATIONS_THIS_WEEK = """
SELECT 
    COUNT(*)
FROM 
    jobs_applicated 
WHERE 
    user_id = :user_id 
    AND date >= date_trunc('week', CURRENT_DATE) 
    AND date < date_trunc('week', CURRENT_DATE) + INTERVAL '1 week'
"""

# Get the number of job applications made this month by a user
GET_NUM_APPLICATIONS_THIS_MONTH = """
SELECT 
    COUNT(*)
FROM 
    jobs_applicated
WHERE 
    user_id = :user_id 
    AND date >= date_trunc('month', CURRENT_DATE) 
    AND date < date_trunc('month', CURRENT_DATE) + INTERVAL '1 month'
"""

# Get the number of job applications made by month, grouped by year and month
GET_NUM_OF_APPLICATIONS_BY_MONTH = """
SELECT 
    EXTRACT(YEAR FROM date) AS year,
    EXTRACT(MONTH FROM date) AS month,
    COUNT(*) AS rows_inserted
FROM 
    jobs_applicated
WHERE 
    user_id = :user_id
GROUP BY 
    EXTRACT(YEAR FROM date), EXTRACT(MONTH FROM date)
ORDER BY 
    year, month
"""

# Get all job applications with additional saved and application date information
GET_ALL_APPLICATIONS = """
SELECT 
    jobs.*,
    CASE WHEN jobs_saved.job_id IS NOT NULL THEN 1 ELSE 0 END AS saved,
    jobs_applicated.date AS applicated_date
FROM 
    jobs
LEFT JOIN 
    jobs_saved ON jobs.job_id = jobs_saved.job_id 
    AND jobs_saved.user_id = :user_id
LEFT JOIN 
    jobs_applicated ON jobs.job_id = jobs_applicated.job_id 
    AND jobs_applicated.user_id = :user_id
WHERE 
    jobs_applicated.job_id IS NOT NULL 
    AND jobs_applicated.job_id = jobs.job_id
"""

# Get details of a specific process application by user ID and job ID
GET_PROCESSES_APPLICATION = """
SELECT id,date, interviewer, phone, subject, description
FROM processes_application 
WHERE user_id = :user_id 
AND job_id = :job_id
"""

# Delete a process application by ID
DELETE_PROCESS_APPLICATION = """
DELETE FROM processes_application 
WHERE id = :id
"""

# Save a new process with detailed information
SAVE_PROCESS = """
INSERT INTO processes_application 
    (user_id, job_id, date, interviewer, phone, subject, description)
VALUES 
    (:user_id, :job_id, TO_DATE(:date, 'DD-MM-YYYY'), :interviewer, :phone, :subject, :description)
RETURNING id
"""

# Update the active status of a job application by ID
UPDATE_ACTIVITY = """
UPDATE jobs_applicated 
SET active = :active 
WHERE id = :id
"""
