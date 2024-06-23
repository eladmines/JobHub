GET_USER_DETAILS="""SELECT * FROM users WHERE email=%s"""

GET_NUM_OF_SAVED_JOBS="""SELECT COUNT(*) AS row_count FROM jobs_saved where user_id=%s"""

GET_NUM_OF_APPLICATIONS_TODAY="""SELECT COUNT(*) AS row_count FROM jobs_applicated where user_id=%s and date=CURRENT_DATE"""