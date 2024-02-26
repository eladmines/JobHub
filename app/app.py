from flask import Flask
from main.routes import main_bp
from jobs.routes import jobs_bp
from companies.routes import companies_bp
from login.routes import login_bp
#from app.app import app
app = Flask(__name__,static_folder='templates')
app.register_blueprint(main_bp)    
app.register_blueprint(jobs_bp)    
app.register_blueprint(companies_bp)  
app.register_blueprint(login_bp)  
if __name__ == '__main__':
    app.run(debug=False)

