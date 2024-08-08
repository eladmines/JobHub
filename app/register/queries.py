REGISTER_USER = """
INSERT INTO users (firstName, lastName, email, password, role, company, experience, skills)
VALUES (:firstName, :lastName, :email, :password, :role, :company, :experience, :skills)
ON CONFLICT (email) DO NOTHING
RETURNING id;
"""
