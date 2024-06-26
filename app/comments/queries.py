SAVE_COMMENT="""UPDATE {}
SET comments = comments || jsonb_build_object(CURRENT_DATE,%s)
WHERE (job_id = %s AND user_id = %s);
"""

GET_COMMENTS="""SELECT comments from {} where user_id=%s AND job_id=%s"""
