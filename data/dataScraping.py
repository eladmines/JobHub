from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from config import switch, logging
import time
from constants import url

from companiesData.kla import jobsLinkClassName

options = webdriver.ChromeOptions()
driver = webdriver.Chrome(options=options)
def getSourceCode(link):
    # Add the 'excludeSwitches' option to disable logging
    options.add_experimental_option(switch , logging)
    driver.get(link)


def getJobsLinks(jobsLinkClassName):
    hrefList=[]
    wait = WebDriverWait(driver, 10)
    jobsLinks = wait.until(EC.presence_of_all_elements_located((By.CLASS_NAME,jobsLinkClassName)))
    for jobLink in jobsLinks:
        hrefList.append(jobLink.get_attribute("href"))
    return hrefList

def getJobInfo(hrefList):
    for jobLink in hrefList:
        getSourceCode(jobLink)
        print(jobLink)
    
    
getSourceCode(url)

hrefLink = getJobsLinks(jobsLinkClassName)
getJobInfo(hrefLink)


"""""


def getsSourceCode():
    options = webdriver.ChromeOptions()
    # Add the 'excludeSwitches' option to disable logging
    options.add_experimental_option('excludeSwitches', ['enable-logging'])
    dr = webdriver.Chrome(options=options)
    dr.get(url)
    wait = WebDriverWait(dr, 10)
    return wait

"""""
""""
for link in hrefList:
    dr.get(link)
    print(link)
    time.sleep(10)
    print(link)
    if(dr.find_elements(By.CLASS_NAME, "css-7papts") is None):
        print("i am none")
    title=dr.find_elements(By.CLASS_NAME, "css-7papts")[0].text
    location=dr.find_elements(By.CLASS_NAME, "css-129m7dg")[0].text
    description = dr.find_elements(By.TAG_NAME, "ul")[0].text
    qualifications = dr.find_elements(By.TAG_NAME, "ul")[1].text
    print(title)
    print(location)
    
    print(qualifications)

"""




    