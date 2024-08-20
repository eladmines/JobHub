class Connection:
    def __init__(self,id,name,position,company,phone,accounts):
        self.id=id
        self.name=name
        self.position=position
        self.company=company
        self.phone=phone
        self.accounts=accounts
    

    def get_id(self):
        return self.id
    
    
    def get_name(self):
        return self.name
    
    def get_position(self):
        return self.position
    
    def get_company(self):
        return self.company
    
    def get_phone(self):
        return self.phone
    
    def get_linkedin_account(self):
        return self.linkedin_account


    def set_id(self, id):
        self.id = id
    
    def set_user_id(self, user_id):
        self.user_id = user_id
    
    def set_name(self, name):
        self.name = name
    
    def set_position(self, position):
        self.position = position
    
    def set_company(self, company):
        self.company = company
    
    def set_phone(self, phone):
        self.phone = phone
    
    def set_linkedin_account(self, linkedin_account):
        self.linkedin_account = linkedin_account

