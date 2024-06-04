import psycopg2
from config import DATABASE_URL
def openConnection():
    try:
        conn = psycopg2.connect(DATABASE_URL)
    except psycopg2.OperationalError as e:
        print('Unable to connect!\n{0}'.format(e))  
        # Return None or raise an exception here based on your requirement
        return None
    else:
        return conn

def closeConnection(con):
    try:
        con.close()
    except Exception as e:
        print('Error closing connection: {0}'.format(e))
