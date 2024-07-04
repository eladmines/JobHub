from app.dbConnections import open_connection, close_connection     
from app.comments.queries import SAVE_COMMENT,GET_COMMENTS
from flask import jsonify

def get_comments(table,user_id,job_id):
     con=open_connection()
     curs=con.cursor()
     try:
          query = GET_COMMENTS.format(table)
          curs.execute(query,(user_id,job_id))
          con.commit() 
          res = curs.fetchall()
          close_connection(con)
          return res
     except Exception as e:
          print(f"Error: {e}")
          # Rollback changes in case of an error
          con.rollback()
          close_connection(con)
          
    
def save_comment(table,user_id,data,job_id):
     con=open_connection()
     curs=con.cursor()
     try:
          query = SAVE_COMMENT.format(table)
          curs.execute(query,(data,job_id,user_id))
          con.commit() 
          close_connection(con)
          return jsonify(True)
     except Exception as e:
          print(f"Error: {e}")
          # Rollback changes in case of an error
          con.rollback()
          close_connection(con)
          return jsonify(False)