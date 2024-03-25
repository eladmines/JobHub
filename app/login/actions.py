from dbConnections import openConnection, closeConnection     
from login.queries import CHECK_LOGIN_DETAILS,GET_USER_DETAILS
import requests,json


def checkLoginDetails(data):
     con=openConnection()
     curs=con.cursor()
     try:
          values=(data['email'],data['password'])
          curs.execute(CHECK_LOGIN_DETAILS,(values[0],values[1]))
          exists = curs.fetchone()[0]
          print("Exsits" , exists)
          if (exists == True):
               #res = curs.execute(GET_USER_DETAILS,(values[0],values[1]))
               #res=curs.fetchone()
               ##res = json.dumps(res)
               print("blabla")
               return True
          else:
               print("ffffffff")
               return False   
     except Exception as e:
          print(f"Error: {e}")
          # Rollback changes in case of an error
          con.rollback() 
   