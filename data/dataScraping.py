from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from config import switch, logging
import time
from constants import url
from data.modules.companyElementsScraping import companyScrapingDetails
from data.companiesData.companies import companyScrapingDetails,companies
options = webdriver.ChromeOptions()
driver = webdriver.Chrome(options=options)

def getSourceCode(link):
    # Add the 'excludeSwitches' option to disable logging
    options.add_experimental_option(switch , logging)
    driver.get(link)


def getJobsLinks(company):
    dataList=[]
    wait = WebDriverWait(driver, 10)
    elements = wait.until(EC.presence_of_all_elements_located((company[0].tagScrapingElement,company[0].nameScrapingElement)))
    for elem in elements:
        dataList.append(elem.get_attribute(company[0].attribute))
    return dataList

def getJobsList(hrefLinks,company):
    for jobLink in hrefLinks:
        getSourceCode(jobLink)
        wait = WebDriverWait(driver, 10)
        title=wait.until(EC.presence_of_element_located((companies[0].jobTitleTag, companies[0].jobTitleVal))).text
  
    
getSourceCode(url)
hrefLinks=getJobsLinks(companies)
getJobsList(hrefLinks,companies)


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




    