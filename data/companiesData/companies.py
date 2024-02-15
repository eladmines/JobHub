
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from ..modules.companyElementsScraping import companyScrapingDetails


# KLA
KLA=companyScrapingDetails("css-19uc56f",By.CLASS_NAME,"href")

companies=[KLA]

