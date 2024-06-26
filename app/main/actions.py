from app.dbConnections import openConnection, closeConnection     
from app.main.queries import GET_USER_DETAILS
from app.savedjobs.queries import GET_NUM_OF_SAVED_JOBS
from app.applications.queries import GET_NUM_OF_APPLICATIONS_TODAY,GET__NUM_APPLICATIONS_THIS_WEEK,GET__NUM_APPLICATIONS_THIS_MONTH
from app.models.profile import Profile
from app.models.user import User

def getUserData(data):
     con=openConnection()
     curs=con.cursor()
     try:
          res = curs.execute(GET_USER_DETAILS,(data,))
          res = curs.fetchone()
          user = User(res[3],"",res[1],res[2],res[5],res[6],res[0],res[7],res[8])
          closeConnection(con)
          dictUser=vars(user)
          return dictUser
     except Exception as e:
          print(f"Error: {e}")
          # Rollback changes in case of an error
          con.rollback() 
     return

def getProfileData(data):
     con=openConnection()
     curs=con.cursor()
     try:
          curs.execute(GET_NUM_OF_SAVED_JOBS,(str(data)))
          savedJobsCounter = curs.fetchone()[0]
          curs.execute(GET_NUM_OF_APPLICATIONS_TODAY,(str(data)))
          appliedTodayCounter = curs.fetchone()[0]
          curs.execute(GET__NUM_APPLICATIONS_THIS_WEEK,(str(data)))
          appliedWeekCounter = curs.fetchone()[0]
          curs.execute(GET__NUM_APPLICATIONS_THIS_MONTH,(str(data)))
          appliedMonthCounter = curs.fetchone()[0]
          profile_obj = Profile(data, savedJobsCounter, appliedTodayCounter,appliedWeekCounter,appliedMonthCounter,15)
          closeConnection(con)
          dictProfile=vars(profile_obj)
          return dictProfile
     except Exception as e:
          print(f"Error: {e}")
          # Rollback changes in case of an error
          con.rollback() 

   