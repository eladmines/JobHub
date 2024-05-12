GET_SAVED_JOBS="SELECT savedjobs FROM users WHERE email=%s"


REMOVE_SAVED_JOB="""UPDATE users 
SET savedjobs = (
    CASE 
        WHEN savedjobs IS NULL OR jsonb_array_length(savedjobs) = 0 THEN
            jsonb_build_array()  -- Empty JSON array
        ELSE
            (SELECT jsonb_agg(job)
             FROM jsonb_array_elements(savedjobs) AS job
             WHERE job->>'id' != %s)
    END
)
WHERE email = %s;"""

REMOVE_SAVED_JOB="""UPDATE users 
SET savedjobs = (
    SELECT jsonb_agg(job)
    FROM jsonb_array_elements(savedjobs) AS job
    WHERE job->>'id' != %s
) WHERE email = %s;
"""

CHECK_EMPTY_COLUMN="""
UPDATE users 
SET savedjobs = (
    CASE 
        WHEN savedjobs IS NULL OR jsonb_array_length(savedjobs) = 0 THEN
            jsonb_build_array() 
    END
)
WHERE email = %s;
"""