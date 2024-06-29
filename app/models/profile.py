class Profile:
    def __init__(self, id, saved_jobs_count, daily_applications_count, weekly_applications_count, monthly_applications_count, weekly_applications_goal):
        self.id = id
        self.saved_jobs_count = saved_jobs_count
        self.daily_applications_count = daily_applications_count
        self.weekly_applications_count = weekly_applications_count
        self.weekly_applications_goal = weekly_applications_goal
        self.monthly_applications_count = monthly_applications_count

    def get_id(self):
        return self.id
    def get_saved_jobs_count(self):
        return self.saved_jobs_count
    def num_of_daily_applications_count(self):
        return self.daily_applications_count
    def num_of_weekly_applications_count(self):
        return self.weekly_applications_count
    def get_monthly_applications_count(self):
        return self.monthly_applications_count
    def get_weekly_applications_goal(self):
        return self.weekly_applications_goal
    def set_id(self,new_value):
        self.id=new_value
    def set_saved_jobs_count(self,new_value):
        self.saved_jobs_count=new_value
    def num_of_daily_applications_count(self,new_value):
        self.num_of_daily_applications_count=new_value
    def set_num_of_weekly_applications_count(self,new_value):
        self.num_of_weekly_applications_count=new_value
    def set_monthly_applications_count(self,new_value):
        self.monthly_applications_count=new_value
    def set_weekly_applications_goal(self,new_value):
        self.weekly_applications_goal=new_value

    