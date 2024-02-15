from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from config import switch, logging
import time
from constants import url

from data.companiesData.companies import companies
options = webdriver.ChromeOptions()
driver = webdriver.Chrome(options=options)

def getSourceCode(link):
    # Add the 'excludeSwitches' option to disable logging
    options.add_experimental_option(switch , logging)
    driver.get(link)


def getJobsLinks(company):
    dataList=[]
    wait = WebDriverWait(driver, 10)
    for company in companies:
        elements = wait.until(EC.presence_of_all_elements_located((By.CLASS_NAME,"css-19uc56f")))
    for elem in elements:
        dataList.append(elem.get_attribute("href"))
    return dataList
"""""
def getJobsList(hrefList):
    getData()
    for jobLink in hrefList:
        getSourceCode(jobLink)
        print(jobLink)
"""  
    
getSourceCode(url)
hrefLinks=getJobsLinks(companies)
print(hrefLinks)


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




    