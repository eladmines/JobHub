GET_SAVED_JOBS="SELECT savedjobs FROM users WHERE email=%s"

REMOVE_SAVED_JOB="""UPDATE users
SET savedjobs = (
    SELECT jsonb_agg(job)
    FROM jsonb_array_elements(savedjobs) AS job
    WHERE job->>'id' != %s
)
"""

