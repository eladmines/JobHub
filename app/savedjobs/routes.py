
from flask import Blueprint, render_template, redirect,request, jsonify
from savedjobs.actions import getSavedJobs

savedjobs_bp = Blueprint("savedjobs_bp", __name__ , template_folder='savedjobs')
@savedjobs_bp.route("/savedjobs")
def index():
    return render_template('savedjobs.html') 

@savedjobs_bp.route("/savedjobs", methods=["POST"])
def handle_post_request():
    data = request.get_json()
    savedJobs=getSavedJobs(data)
    ##print("ppppppppppppp",savedJobs[2],"xxxxxxxxxxxxxxx")
    return savedJobs
