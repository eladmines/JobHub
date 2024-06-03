from flask import  render_template, redirect
from app.companies import companies_bp



@companies_bp.route("/companies")
def index():
    return render_template('companies.html')
