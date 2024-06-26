GET_SAVED_JOBSIDS="SELECT job_id FROM jobs_saved WHERE user_id=%s"

GET_SAVED_JOBS="SELECT * FROM jobs WHERE id=%s"

DELETE_SAVED_JOB="DELETE FROM jobs_saved WHERE user_id=%s AND job_id=%s"

GET_NUM_OF_SAVED_JOBS="""SELECT COUNT(*) AS row_count FROM jobs_saved where user_id=%s"""

SAVE_JOB = """
INSERT INTO jobs_saved (user_id,job_id)
VALUES (%s,%s)
ON CONFLICT (user_id,job_id) DO NOTHING
"""
