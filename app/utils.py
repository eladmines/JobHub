from app.dbConnections import open_connection, close_connection     
from sqlalchemy import text

#Remove special characters from JSON
def remove_special_chars(item):
     if item is None:
          return None
     item = item.translate(str.maketrans({"'": " ", "\n": " <br> ", "\\": "", '{': " ", '}': " ", '"': " "}))
     return item

#Connect->Execute (Save data)->Close connection
def save_query_exec(query, params):
    con = open_connection()
    try:
        trans = con.begin()
        result = con.execute(text(query), params)
        trans.commit()
        res = result.fetchone()
        #close_connection(con)
        return res
    except Exception as e:
        print(f"Error: {e}")
        trans.rollback()
        close_connection(con)
        return None

def delete_query_exec(query, params):
    con = open_connection()
    try:
        trans = con.begin()
        con.execute(text(query), params)
        trans.commit()
        close_connection(con)
        return True
    
    except Exception as e:
        print(f"Error: {e}")
        trans.rollback()
        #close_connection(con)
        return False

#Get query execution - no commit neeeded
def get_query_exec(query, params):
    con = open_connection()
    try:
        trans = con.begin()
        result = con.execute(text(query), params)
        data = [dict(row) for row in result.mappings()]
        close_connection(con)
        return data
    except Exception as e:
        print(f"Error: {e}")
        trans.rollback()
        close_connection(con)
        return []




