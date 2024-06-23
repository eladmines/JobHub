from app.dbConnections import openConnection, closeConnection     
from app.comments.queries import SAVE_COMMENT,GET_COMMENTS
from app.models.job import Job
from flask import jsonify

def getComments(user_id,job_id):
     con=openConnection()
     curs=con.cursor()
     try:
          curs.execute(GET_COMMENTS,(user_id,job_id))
          con.commit() 
          res = curs.fetchall()
          print(res)
          closeConnection(con)
          return res
     except Exception as e:
          print(f"Error: {e}")
          # Rollback changes in case of an error
          con.rollback()
          closeConnection(con)
          
    
def saveComment(user_id,data,job_id):
     con=openConnection()
     curs=con.cursor()
     try:
          curs.execute(SAVE_COMMENT,(data,job_id,user_id))
          con.commit() 
          closeConnection(con)
          return jsonify(True)
     except Exception as e:
          print(f"Error: {e}")
          # Rollback changes in case of an error
          con.rollback()
          closeConnection(con)
          return jsonify(False)