from flask import Blueprint
from app.app import app
companies_bp = Blueprint("companies_bp", __name__ , template_folder='companies')

