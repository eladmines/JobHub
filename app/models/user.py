class User:
    def __init__(self,id, firstname, lastname, email, password, role, company, experience, skills):
        self.email = email
        self.password = password
        self.firstname = firstname
        self.lastname = lastname
        self.role = role
        self.company = company
        self.id = id
        self.experience = experience
        self.skills = skills

    def get_email(self):
        return self.email
    
    def set_email(self, email):
        self.email = email

    def get_password(self):
        return self.password
    
    def set_password(self, password):
        self.password = password

    def get_firstname(self):
        return self.firstname
    
    def set_firstname(self, firstname):
        self.firstname = firstname

    def get_lastname(self):
        return self.lastname
    
    def set_lastname(self, lastname):
        self.lastname = lastname

    def get_role(self):
        return self.role
    
    def set_role(self, role):
        self.role = role

    def get_company(self):
        return self.company
    
    def set_company(self, company):
        self.company = company

    def get_id(self):
        return self.id
    
    def set_id(self, id):
        self.id = id

    def get_experience(self):
        return self.experience
    
    def set_experience(self, experience):
        self.experience = experience

    def get_skills(self):
        return self.skills
    
    def set_skills(self, skills):
        self.skills = skills

    def __str__(self):
        return (f"User(id={self.id}, firstname={self.firstname}, lastname={self.lastname}, "
                f"email={self.email}, role={self.role}, company={self.company}, "
                f"experience={self.experience}, skills={self.skills})")