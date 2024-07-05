from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import psycopg2
from app.data.queries import INSERT_JOBS
from app.data.constants import DATABASE_URL
from app.models.job import Job
options = webdriver.ChromeOptions()
driver = webdriver.Chrome(options=options)

class company_elements:
      def __init__(self,url, tag_links, name_links, name_title, name_location,  name_description,name_date):
         self.url = url
         self.tag_links = tag_links
         self.name_links = name_links
         self.name_title = name_title
         self.name_location = name_location
         self.name_description = name_description
         self.name_date = name_date
      def get_links(self):
        links = WebDriverWait(driver, 10).until(
            EC.presence_of_all_elements_located((getattr(By, self.tag_links), self.name_links))
        )
        return [link.get_attribute('href') for link in links]
      
      def get_item(self,name_item):
         item = WebDriverWait(driver, 10).until( EC.presence_of_element_located((By.XPATH,name_item))).text
         return item
      
      def create_jobs_list(self,company):
         driver.get(self.url)
         links = self.get_links()
         jobs=[]
         for link in links:
            driver.get(link)
            title=self.get_item(self.name_title)
            location=self.get_item(self.name_location)
            description=self.get_item(self.name_description)
            job = Job(title,location,description," ","Not available",link,company," "," ")
            jobs.append(job)
         sendJobsToDB(jobs)

def sendJobsToDB(jobs):
    try:
        conn = psycopg2.connect(DATABASE_URL)
    except psycopg2.OperationalError as e:
        print('Unable to connect!\n{0}'.format(e))  
        return None
    else:
        curs=conn.cursor()
        for job in jobs:
            curs.execute(INSERT_JOBS, (job.title, job.location, job.description,"", job.date,job.link,job.company," "))
            conn.commit()


