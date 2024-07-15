from .queries import GET_CONNECTIONS,ADD_CONNECTION,DELETE_CONNECTION
from app.utils import get_query_exec,save_query_exec,delete_query_exec
from app.models.connection import Connection
def get_connections(user_id):
    data=(user_id,)
    rows = get_query_exec(GET_CONNECTIONS,data)
    if(rows is None):
            return "Error: get connections query failed",400
    connections=[]
    for row in rows:
        id=row['id']
        user_id=row['user_id']
        name=row['name']
        position=row['position']
        company=row['company']
        phone=row['phone']
        accounts=row['accounts']
        connection = Connection(id,user_id,name,position,company,phone,accounts)
        connection= connection.__dict__
        connections.append(connection)  
    return connections,None

def add_connection(data):
    save_query_exec(ADD_CONNECTION,data)


def delete_connection(data):
    delete_query_exec(DELETE_CONNECTION,data)