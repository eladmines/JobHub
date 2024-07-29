GET_CONNECTIONS="""SELECT * FROM connections where user_id=%s"""

ADD_CONNECTION="""INSERT INTO connections(user_id,name,position,company,phone,accounts) VALUES (%s,%s,%s,%s,%s,%s) RETURNING id;"""

DELETE_CONNECTION= """DELETE FROM connections WHERE user_id=%s AND id=%s"""

