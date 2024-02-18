from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from config import switch, logging
from constants import url
from models.companyElementsScraping import companyScrapingDetails,driver,options
from companiesData.companies import MicrosoftScrapingDetails,MICROSOFT


def getSourceCode(link):
    # Add the 'excludeSwitches' option to disable logging
    options.add_experimental_option(switch , logging)
    driver.get(link)

getSourceCode(url)

jobs=MICROSOFT.CreateJobsList()

print(jobs)
#MICROSOFT.getJobDetails(buttons)

    