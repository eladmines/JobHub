from .queries import GET_CONNECTIONS,ADD_CONNECTION,DELETE_CONNECTION
from app.utils import get_query_exec,save_query_exec,delete_query_exec,get_id_by_token
from app.models.connection import Connection
def get_connections(user_id):
    data={'user_id':user_id}
    rows = get_query_exec(GET_CONNECTIONS,data)
    if rows is None:
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
        connection = Connection(id,name,position,company,phone,accounts)
        connection= connection.__dict__
        connections.append(connection)  
    return connections,None

def add_connection(connection,user_id):
    #data={'user_id':data[0],'name':data[1],'position':data[2],'company':data[3],'phone':data[4],'accounts':data[5]}
    del connection.id
    connection = connection.__dict__
    user_id={'user_id': user_id}
    combined_dict = {**connection, **user_id}
    return save_query_exec(ADD_CONNECTION,combined_dict)


def delete_connection(user_id,connection_to_delete):
    data={"user_id":user_id,"id":connection_to_delete}
    delete_query_exec(DELETE_CONNECTION,data)