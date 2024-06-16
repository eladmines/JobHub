GET_USER_DETAILS="""SELECT * FROM users WHERE email=%s"""

GET_NUM_OF_SAVED_JOBS="""SELECT COUNT(*) AS row_count FROM jobs_saved where user_id=%s"""