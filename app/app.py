from flask import Flask
from app.main.routes import main_bp
from app.jobs.routes import jobs_bp
from app.login.routes import login_bp
from app.register.routes import register_bp
from app.savedjobs.routes import savedjobs_bp
from app.profile.routes import profile_bp
from app.applications.routes import applications_bp
from app.sending_email.routes import sending_email_bp
from app.connections.routes import connections_bp
from app.forgot_password.routes import forgot_password_bp
from app.top_bar.routes import top_bar_bp


app = Flask(__name__,static_folder='templates')
app.register_blueprint(main_bp)    
app.register_blueprint(jobs_bp)    
app.register_blueprint(login_bp)  
app.register_blueprint(register_bp)  
app.register_blueprint(savedjobs_bp)
app.register_blueprint(profile_bp)
app.register_blueprint(applications_bp)
app.register_blueprint(sending_email_bp)
app.register_blueprint(connections_bp)
app.register_blueprint(forgot_password_bp)
app.register_blueprint(top_bar_bp)
