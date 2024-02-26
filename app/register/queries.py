
def generate_insert_query(data):
    insert_query = "INSERT INTO users (firstName, lastName, email, password, role, company) " \
                   "VALUES (%s, %s, %s, %s, %s, %s)"

    # Assuming 'data' is a dictionary with the necessary keys
    values = (data.get('firstname'), data.get('lastname'), data.get('email'),
              data.get('password'), data.get('role'), data.get('company'))
    