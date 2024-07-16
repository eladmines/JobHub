# Add the 'excludeSwitches' option to disable logging
switch = 'excludeSwitches'
logging = ['enable-logging']

#DB
ENDPOINT ="jobby.czkaa4kseikm.us-east-1.rds.amazonaws.com" 
DATABASE = "postgres"
USERNAME="jobby"
PASSWORD="12345678"
PORT="5432"
DATABASE_URL = f"host='{ENDPOINT}' dbname='{DATABASE}' user='{USERNAME}' password='{PASSWORD}' port='{PORT}'"