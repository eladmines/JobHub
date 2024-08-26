from app.utils import get_query_exec
from app.top_bar.queries import GET_NAME
def get_name(user_id):
    params={'id':user_id}
    rows = get_query_exec(GET_NAME,params)
    return rows
