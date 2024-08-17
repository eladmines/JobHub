
import subprocess
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import pytest

class Tests:
    def __init__(self):
        self.driver = webdriver.Chrome()

    def teardown(self):
        self.driver.quit()

class LoginPageTests(Tests):
    def __init__(self):
        super().__init__()
        self.base_url = "http://localhost:5000/"
    def test_login_page_load(self):

    def test_valid_login(self):

    def test_invalid_login(self):

    def test_empty_fields(self):

    def test_username_field_validation(self):
    
    def test_password_field_validation(self):
    
    def test_remember_me(self):
    
    def test_redirect_after_login(self):

    
    
""""    

@pytest.fixture
def driver():
    # Initialize the WebDriver
    driver = webdriver.Chrome()
    yield driver
    driver.quit()

def test_login_page(driver):
    driver.get('http://localhost:5000/')
    wait = WebDriverWait(driver, 10)
    username_field = wait.until(EC.presence_of_element_located((By.XPATH, '//*[@id="InputEmail"]')))
    username_field.clear()

    # Submit the form
    submit_button = driver.find_element(By.XPATH, '//*[@id="login-btn"]')
    submit_button.click()

    # Wait for the alert to appear
    alert = wait.until(EC.alert_is_present())

        # Switch to the alert
    alert = driver.switch_to.alert

    assert alert.text == "Empty inputs", f"Unexpected alert text: {alert.text}"

if __name__ == "__main__":
    flask_process = subprocess.Popen(["python", "C:/Users/mines/Desktop/Joblin/run.py"])
    time.sleep(5)

    try:
        pytest.main(["-v"])
    finally:

        flask_process.terminate()"""
