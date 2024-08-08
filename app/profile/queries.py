UPDATE_USER_DETAILS = """
    UPDATE users
    SET firstname=:firstname, lastname=:lastname, company=:company, role=:role, experience=:experience, skills=:skills
    WHERE id=:id
"""