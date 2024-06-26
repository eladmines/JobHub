from app.dbConnections import openConnection, closeConnection     
from app.comments.queries import SAVE_COMMENT,GET_COMMENTS
from flask import jsonify

def getComments(table,user_id,job_id):
     con=openConnection()
     curs=con.cursor()
     try:
          query = GET_COMMENTS.format(table)
          curs.execute(query,(user_id,job_id))
          con.commit() 
          res = curs.fetchall()
          closeConnection(con)
          return res
     except Exception as e:
          print(f"Error: {e}")
          # Rollback changes in case of an error
          con.rollback()
          closeConnection(con)
          
    
def saveComment(table,user_id,data,job_id):
     con=openConnection()
     curs=con.cursor()
     try:
          query = SAVE_COMMENT.format(table)
          curs.execute(query,(data,job_id,user_id))
          con.commit() 
          closeConnection(con)
          return jsonify(True)
     except Exception as e:
          print(f"Error: {e}")
          # Rollback changes in case of an error
          con.rollback()
          closeConnection(con)
          return jsonify(False)