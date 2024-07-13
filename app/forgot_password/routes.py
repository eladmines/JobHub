from flask import  render_template
from app.forgot_password import forgot_password_bp

@forgot_password_bp.route("/forgot_password")
def index():
    return render_template('forgot-password.html')
