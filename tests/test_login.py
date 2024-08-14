import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import subprocess
import time
# Define the fixture
@pytest.fixture
def driver():
    options = webdriver.ChromeOptions()
    driver = webdriver.Chrome(options=options)
    yield driver
    driver.quit()

# Define the test
def test_login_page(driver):
    # Navigate to the login page
    driver.get('http://localhost:5000/')
    
    # Wait for the page to load and for elements to be present
    wait = WebDriverWait(driver, 10)
    
    # Locate the input fields
    username_field = wait.until(EC.presence_of_element_located((By.NAME, 'username')))
    password_field = wait.until(EC.presence_of_element_located((By.NAME, 'password')))
    
    # Optionally: Scrape or interact with the input fields
    username_value = username_field.get_attribute('value')  # Get the value of the username field
    password_value = password_field.get_attribute('value')  # Get the value of the password field

    print(f"Username field value: {username_value}")
    print(f"Password field value: {password_value}")

    # Perform assertions or further interactions
    assert username_field.is_displayed()
    assert password_field.is_displayed()

    # Optionally: Fill the input fields and submit
    username_field.send_keys('testuser')
    password_field.send_keys('testpassword')
    submit_button = driver.find_element(By.XPATH, '//input[@type="submit"]')
    submit_button.click()

    # Check if login was successful
    assert "Welcome" in driver.page_source  # Example check

# Main function to execute the tests
if __name__ == "__main__":
    # Start the Flask app
    flask_process = subprocess.Popen(["python", "C:/Users/mines/Desktop/Joblin/run.py"])

    # Wait for the app to start
    time.sleep(5)

    try:
        # Run tests
        pytest.main(["-v"])
    finally:
        # Terminate the Flask app
        flask_process.terminate()
