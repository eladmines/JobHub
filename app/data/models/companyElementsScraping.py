from abc import ABC, abstractmethod
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
from app.models.job import Job
from selenium.common.exceptions import NoSuchElementException,StaleElementReferenceException

options = webdriver.ChromeOptions()
driver = webdriver.Chrome(options=options)

class companyScrapingDetails(ABC):
      def getJobsElements(self):
           pass

i=0

class MicrosoftScrapingDetails(companyScrapingDetails):
   def __init__(self,tagScrapingElement,nameScrapingElement,attribute,jobTitleTag,jobTitleVal,jobLocationTag,jobLocationVal,jobDescriotionTag,jobDescriotionVal,jobQualificationTag,jobQualificationVal,jobDateTag,jobDateVal):
        self.nameScrapingElement=nameScrapingElement
        self.tagScrapingElement=tagScrapingElement
        self.attribute=attribute
        self.jobTitleTag=jobTitleTag
        self.jobTitleVal=jobTitleVal
        self.jobLocationTag=jobLocationTag
        self.jobLocationVal=jobLocationVal
        self.jobDescriotionTag= jobDescriotionTag
        self.jobDescriotionVal = jobDescriotionVal
        self.jobQualificationTag=jobQualificationTag
        self.jobQualificationVal=jobQualificationVal
        self.jobDateTag= jobDateTag
        self.jobDateVal = jobDateVal
        

   def CreateJobsList(self):
      jobs=[]
      for i in range(6):
         elements= WebDriverWait(driver, 10).until(EC.presence_of_element_located((self.tagScrapingElement,self.nameScrapingElement)))
         seeDetails = elements.find_element(By.TAG_NAME, self.attribute)
         seeDetails.click()
         title = WebDriverWait(driver, 10).until(EC.presence_of_element_located((self.jobTitleTag,self.jobTitleVal)))
         location = WebDriverWait(driver, 10).until(EC.presence_of_element_located((self.jobLocationTag,self.jobLocationVal)))
         description = WebDriverWait(driver, 10).until(EC.presence_of_element_located((self.jobDescriotionTag,self.jobDescriotionVal)))
         qual = WebDriverWait(driver, 10).until(EC.presence_of_element_located((self.jobQualificationTag,self.jobQualificationVal)))
         date = WebDriverWait(driver, 10).until(EC.presence_of_element_located((self.jobDateTag,self.jobDateVal)))
         li_elements = qual.find_elements(By.TAG_NAME, 'li')
         qualifications = []
         for li_element in li_elements:
            qualifications.append(li_element.text+'\n')
         link = driver.current_url
         job = Job(1,title,location,description,qualifications,"Microsoft","image link",date,link)
         driver.back()
         jobs.append(job)
      return jobs
   
 