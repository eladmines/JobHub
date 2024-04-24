GET_SAVED_JOBS="SELECT savedjobs FROM users WHERE email=%s"

REMOVE_SAVED_JOB="""UPDATE users 
SET savedjobs = %s::jsonb
WHERE email = %s;"""


