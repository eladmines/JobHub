GET_CONNECTIONS = """
SELECT * FROM connections WHERE user_id = :user_id
"""

ADD_CONNECTION = """
INSERT INTO connections (user_id,name, position, company, phone, accounts)
VALUES (:user_id,:name, :position, :company, :phone, :accounts)
RETURNING id
"""

DELETE_CONNECTION = """
DELETE FROM connections WHERE user_id = :user_id AND id = :id
"""

