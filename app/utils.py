from app.dbConnections import open_connection, close_connection     
import psycopg2.extras

#Remove special characters from JSON
def remove_special_chars(item):
     if item is None:
          return None
     item = item.translate(str.maketrans({"'": " ", "\n": " <br> ", "\\": "", '{': " ", '}': " ", '"': " "}))
     return item

#Connect->Execute (Save data)->Close connection
def save_query_exec(query,data):
     con=open_connection()
     curs=con.cursor()
     try:
          curs.execute(query,data)
          con.commit() 
          close_connection(con)
          return True
     except Exception as e:
          print(f"Error: {e}")
          con.rollback()

def delete_query_exec(query,data):
     con=open_connection()
     curs=con.cursor()
     print(data)
     try:
          curs.execute(query,data)
          con.commit() 
          close_connection(con)
          return True
     except Exception as e:
          print(f"Error: {e}")
          con.rollback()

#Get query execution - no commit neeeded
def get_query_exec(query,data):
     con=open_connection()
     curs = con.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
     try:
          curs.execute(query,(data))
          data=curs.fetchall()
          close_connection(con)
          return data
     except Exception as e:
          print(f"Error: {e}")
          con.rollback()




