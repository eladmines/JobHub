
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from ..modules.companyElementsScraping import companyScrapingDetails


# KLA
KLA=companyScrapingDetails("css-19uc56f",By.CLASS_NAME,"href",f'h2[data-automation-id="jobPostingHeader"].css-7papts',By.CSS_SELECTOR)

companies=[KLA]

