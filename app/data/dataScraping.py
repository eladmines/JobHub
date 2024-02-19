from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from config import switch, logging
from constants import url,DATABASE_URL,INSERT_JOBS,CREATE_JOBS_TABLE
from models.companyElementsScraping import companyScrapingDetails,driver,options
from companiesData.companies import MicrosoftScrapingDetails,MICROSOFT
import psycopg2



DROP_JOBS="DROP TABLE IF EXISTS jobs;"


def getSourceCode(link):
    # Add the 'excludeSwitches' option to disable logging
    options.add_experimental_option(switch , logging)
    driver.get(link)

def sendJobsToDB(jobs):
    try:
        conn = psycopg2.connect(DATABASE_URL)
    except psycopg2.OperationalError as e:
        print('Unable to connect!\n{0}'.format(e))  
        # Return None or raise an exception here based on your requirement
        return None
    else:
        curs=conn.cursor()
        curs.execute(CREATE_JOBS_TABLE)
        for job in jobs:
            curs.execute(INSERT_JOBS, (job.title, job.location, job.description, job.qualifications, job.date,job.link,"Microsoft","https://i.pinimg.com/originals/b2/d9/06/b2d906c4b90768b63db1078cf365ca9f.jpg"))
            
            conn.commit()
        
if __name__ == "__main__":
    getSourceCode(url)
    jobs=MICROSOFT.CreateJobsList()
    sendJobsToDB(jobs)


    