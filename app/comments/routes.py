from flask import Blueprint
from flask import  request
from app.comments.actions import getComments,saveComment

comments_bp = Blueprint("comments_bp", __name__ , template_folder='comments')
@comments_bp.route("/comments", methods=["POST"])
def handle_post_request():
    data = request.get_json()
    action = data['action']
    userId=data['sentData'][0]
    if action == "get comments":
        jobId=data['sentData'][1]
        res=getComments(int(userId),jobId)
        return res
    elif action == "insert a comment":
        jobId=data['sentData'][1]
        dataForaAction=data['sentData'][2]
        res=saveComment(int(userId),dataForaAction,jobId)
        return res
