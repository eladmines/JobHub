from app.dbConnections import open_connection, close_connection     

#Remove special characters from JSON
def remove_special_chars(job):
    job["title"]=job["title"].replace("'"," ")
    job["description"] = job["description"].translate(str.maketrans({"'": " ", "\n": "<br>", '"': ""}))
    job["qualifications"] = job["qualifications"].translate(str.maketrans({"'": " ", "\n": "<br>", "\\": "", '{': " ", '}': " ", '"': " "}))
    return job

#Connect->Execute->Close connection
def query_exec(userId,jobId,query):
     con=open_connection()
     curs=con.cursor()
     try:
          curs.execute(query,(userId,jobId))
          con.commit() 
          close_connection(con)
     except Exception as e:
          print(f"Error: {e}")
          # Rollback changes in case of an error
          con.rollback()

