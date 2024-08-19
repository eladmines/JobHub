from app.dbConnections import open_connection, close_connection     
from app.main.queries import GET_USER_DETAILS
from app.savedjobs.queries import GET_NUM_OF_SAVED_JOBS
from app.applications.queries import GET_NUM_OF_APPLICATIONS_TODAY,GET_NUM_APPLICATIONS_THIS_WEEK,GET_NUM_APPLICATIONS_THIS_MONTH,GET_NUM_OF_APPLICATIONS_BY_MONTH
from app.models.profile import Profile
from app.models.user import User
from sqlalchemy import text
def get_user_data(data):
     con=open_connection()
     try:
          query = text(GET_USER_DETAILS)
          res = con.execute(query, {"id": data})
          res = res.fetchone()
          user = User(res[0],res[1],res[2],res[3],res[4],res[5],res[6],res[7],res[8])
          dictUser=vars(user)
          return dictUser
     except Exception as e:
          print(f"Error: {e}")
          # Rollback changes in case of an error
          con.rollback() 
     return

def get_profile_data(data):
     con=open_connection()
     try:
          data={'user_id':data}
          
          res = con.execute(text(GET_NUM_OF_SAVED_JOBS),data)
          saved_jobs_counter = res.fetchone()[0]
          saved_jobs_counter if saved_jobs_counter else 0
          
          res = con.execute(text(GET_NUM_OF_APPLICATIONS_TODAY),data)
          applied_today_counter = res.fetchone()[0]
          applied_today_counter if applied_today_counter else 0

          res = con.execute(text(GET_NUM_APPLICATIONS_THIS_WEEK),data)
          applied_week_counter = res.fetchone()[0]
          applied_week_counter if applied_week_counter else 0

          res = con.execute(text(GET_NUM_APPLICATIONS_THIS_MONTH),data)
          applied_month_counter = res.fetchone()[0]
          applied_month_counter if applied_month_counter else 0
          
          res = con.execute(text(GET_NUM_OF_APPLICATIONS_BY_MONTH),data)
          applied_by_month_counter = res.fetchall()
          month_applications_arr = create_months_applications_arr(applied_by_month_counter)
          
          profile_obj = Profile(data, saved_jobs_counter, applied_today_counter,applied_week_counter,applied_month_counter,applied_month_counter,month_applications_arr)
          #close_connection(con)
          
          dictProfile=vars(profile_obj)
          
          return dictProfile
     except Exception as e:
          print(f"Error: {e}")
          # Rollback changes in case of an error
          con.rollback() 

def create_months_applications_arr(arr):
     month_applications_arr = []
     for item in arr:
          month_applications_arr.append((int(item[1]),int(item[2])))
     bool=False
     for i in range(12):
          for item in month_applications_arr:
               if i+1 == item[0]:
                    bool=True
                    
          if not bool:
               month_applications_arr.append((i+1,0))
          bool=False
     month_applications_arr = sorted(month_applications_arr)
     return month_applications_arr
     