from .queries import GET_CONNECTIONS
from app.utils import get_query_exec
from app.models.connection import Connection
def get_connections(user_id):
    rows = get_query_exec(GET_CONNECTIONS,user_id)
    if(rows is None):
            return "Error: get connections query failed",400
    connections=[]
    for row in rows:
        id=row[0]
        user_id=row[1]
        name=row[2]
        position=row[3]
        company=row[4]
        phone=row[5]
        linkdin_account=row[6]
        connection = Connection(id,user_id,name,position,company,phone,linkdin_account)
        connection= connection.__dict__
        connections.append(connection)  
    return connections,None
    