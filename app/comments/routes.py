from flask import request
from app.comments import comments_bp
from app.comments.actions import get_comments,save_comment


@comments_bp.route("/comments", methods=["POST"])
def handle_post_request():
    data = request.get_json()
    action = data['action'].split(" ")[0]
    userId=data['sentData'][0]
    if action in "get comments":
        endpoint=data['action'].split(" ")[2]
        jobId=data['sentData'][1]
        if "application" in endpoint:
            endpoint="jobs_applicated"
            res=get_comments(endpoint,int(userId),jobId)
        if "saved" in endpoint:
            endpoint="jobs_saved"
            res=get_comments(endpoint,int(userId),jobId)
        return res
    
    elif action in "insert a comment":
        endpoint=data['action'].split(" ")[3]
        jobId=data['sentData'][1]
        dataForaAction=data['sentData'][2]
        if "application" in endpoint:
            endpoint="jobs_applicated"
            res=save_comment(endpoint,int(userId),dataForaAction,jobId)
        if "saved" in endpoint:
            endpoint="jobs_saved"
            res=save_comment(endpoint,int(userId),dataForaAction,jobId)
        return res
    return
