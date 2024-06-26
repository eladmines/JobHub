GET_APPLICATIONS_JOBSIDS="SELECT job_id FROM jobs_applicated WHERE user_id=%s"

GET_APPLICATED_JOBS="SELECT * FROM jobs WHERE id=%s"

SAVE_JOB_APPLICATION = """
INSERT INTO jobs_applicated (user_id,job_id)
VALUES (%s,%s)
ON CONFLICT (user_id,job_id) DO NOTHING
"""

DELETE_APPLICATION="DELETE FROM jobs_applicated WHERE user_id=%s AND job_id=%s"

GET_NUM_OF_APPLICATIONS_TODAY="""SELECT COUNT(*) AS row_count FROM jobs_applicated where user_id=%s and date=CURRENT_DATE"""

GET__NUM_APPLICATIONS_THIS_WEEK="""SELECT COUNT(*)
FROM jobs_applicated
WHERE date >= date_trunc('week', CURRENT_DATE)
  AND date < date_trunc('week', CURRENT_DATE) + INTERVAL '1 week'; """

GET__NUM_APPLICATIONS_THIS_MONTH="""SELECT COUNT(*)
FROM jobs_applicated
WHERE date >= date_trunc('month', CURRENT_DATE)
  AND date < date_trunc('month', CURRENT_DATE) + INTERVAL '1 month'; """