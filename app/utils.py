from app.dbConnections import openConnection, closeConnection     

#Remove special characters from JSON
def removeSpecialChars(job):
    job["title"]=job["title"].replace("'"," ")
    job["description"] = job["description"].translate(str.maketrans({"'": " ", "\n": "<br>", '"': ""}))
    job["qualifications"] = job["qualifications"].translate(str.maketrans({"'": " ", "\n": "<br>", "\\": "", '{': " ", '}': " ", '"': " "}))
    return job

#Connect->Execute->Close connection
def queryExec(userId,jobId,query):
     con=openConnection()
     curs=con.cursor()
     try:
          curs.execute(query,(userId,jobId))
          con.commit() 
          closeConnection(con)
     except Exception as e:
          print(f"Error: {e}")
          # Rollback changes in case of an error
          con.rollback()