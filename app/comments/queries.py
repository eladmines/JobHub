SAVE_COMMENT="""UPDATE jobs_saved
SET comments = comments || jsonb_build_object(CURRENT_DATE,%s)
WHERE (job_id = %s AND user_id = %s);
"""

GET_COMMENTS="""SELECT comments from jobs_saved where user_id=%s AND job_id=%s"""