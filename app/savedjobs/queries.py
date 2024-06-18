GET_SAVED_JOBSIDS="SELECT job_id FROM jobs_saved WHERE user_id=%s"

GET_SAVED_JOBS="SELECT * FROM jobs WHERE id=%s"

DELETE_SAVED_JOB="DELETE FROM jobs_saved WHERE user_id=%s AND job_id=%s"

INIT_EMPTY_SAVEDJOBS_ARR="""
UPDATE users 
SET savedjobs = (
    CASE 
        WHEN savedjobs IS NULL OR jsonb_array_length(savedjobs) = 0 THEN
            jsonb_build_array() 
    ELSE
        savedjobs
    END
)
WHERE email = %s;
"""

SAVE_COMMENT="""UPDATE jobs_saved
SET comments = comments || jsonb_build_object(CURRENT_DATE,%s)
WHERE (job_id = %s AND user_id = %s);
"""

GET_COMMENTS="""SELECT comments from jobs_saved where user_id=%s AND job_id=%s"""

