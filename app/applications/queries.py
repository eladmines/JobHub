GET_APPLICATIONS_JOBSIDS="SELECT job_id FROM jobs_applicated WHERE user_id=%s"

GET_APPLICATED_JOBS="SELECT * FROM jobs WHERE id=%s"

SAVE_JOB_APPLICATION = """
INSERT INTO jobs_applicated (user_id,job_id)
VALUES (%s,%s)
ON CONFLICT (user_id,job_id) DO NOTHING
"""

DELETE_APPLICATION="DELETE FROM jobs_applicated WHERE user_id=%s AND job_id=%s"