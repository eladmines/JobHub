
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from models.companyElementsScraping import MicrosoftScrapingDetails,i


#MICROSOFT
MICROSOFT=MicrosoftScrapingDetails(By.CSS_SELECTOR,f'[data-list-index="{i}"]',"button",By.XPATH,'/html/body/div/main/div[4]/div[2]/div/div[2]/div/div/div/h1',By.XPATH,'/html/body/div/main/div[4]/div[2]/div/div[2]/div/div/div/div[2]/div/p',By.XPATH,'/html/body/div/main/div[4]/div[2]/div/div[2]/div/div/div/div[5]/div[1]/div/div',By.XPATH,"/html/body/div/main/div[4]/div[2]/div/div[2]/div/div/div/div[5]/div[2]/div/div/ul[1]",By.XPATH,"/html/body/div/main/div[4]/div[2]/div/div[2]/div/div/div/div[4]/div[1]/div/div[2]")


