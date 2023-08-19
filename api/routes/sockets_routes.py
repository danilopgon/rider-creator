
from utils.db import db
from flask import request, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
# from controllers.chat_controller import get_chat


chat = Blueprint('chat', __name__)

@chat.route('/chat')
@jwt_required()
def get_chats():
    # current_user = get_jwt_identity()
    # return get_chat(current_user.id)
    return





