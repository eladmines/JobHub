from flask import Flask
from app.main.routes import main_bp
#from app.jobs.routes import jobs_bp
#from app.companies.routes import companies_bp
#from app.app import app
app = Flask(__name__,static_folder='templates')
app.register_blueprint(main_bp)    
#app.register_blueprint(jobs_bp)    
#app.register_blueprint(companies_bp)   
if __name__ == '__main__':
    app.run(debug=False)

