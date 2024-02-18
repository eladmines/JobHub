
from flask import Blueprint, render_template, redirect,request
import psycopg2


main_bp = Blueprint("main_bp", __name__ , template_folder='main')
DATABASE_URL="postgres://njbfbloq:O2eskQEEPaRKJX16XXKYi18WdeslSXx7@snuffleupagus.db.elephantsql.com/njbfbloq"
CREATE_ROOMS_TABLE=("CREATE TABLE IF NOT EXISTS Jobs (id SERIAL PRIMARY KEY, jobTitle TEXT, jobDescription TEXT, jobCompany TEXT, image TEXT, date TIMESTAMP);")
INSERT_ROOMS = """("INSERT INTO jobs (jobTitle, jobDescription, jobCompany, image, date)
VALUES (
    'Software Developer',
    'A minimum of 5 years of experience in software engineering, with a focus on leadership roles. Strong technical background with expertise in multiple programming languages and frameworks. Excellent communication skills, both written and verbal, to effectively convey technical concepts to diverse stakeholders. Proven ability to collaborate with cross-functional teams and align software development goals with broader business objectives. Strong project management skills, including the ability to prioritize and manage multiple tasks simultaneously. Demonstrated leadership in fostering a positive and collaborative team culture',
    'Intel',
    'https://upload.wikimedia.org/wikipedia/commons/6/64/Intel-logo-2022.png',
    NOW()
);"""

DROP_JOBS="DROP TABLE IF EXISTS jobs;"


@main_bp.route("/")
def index():
    return render_template('index.html') 


 