
from sqlalchemy import create_engine
from config import DATABASE_URL

def open_connection():
    engine = create_engine(DATABASE_URL)
    try:
        connection = engine.connect()
        return connection
    except Exception as e:
        print(f"Error connecting to PostgreSQL RDS: {e}")
        raise

def close_connection(engine):
    try:
        engine.dispose()
    except Exception as e:
        print('Error closing connection: {0}'.format(e))
