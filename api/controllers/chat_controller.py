from flask_socketio import emit, join_room, leave_room, SocketIO

import json
from flask import jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.conversations import Conversation
from models.conversation_user import Conversation_User
from models.message import Message
import datetime
from utils.db import db

socketio = SocketIO()

def get_chat(id):
    conversations = Conversation.query.filter(Conversation.users.any(id=id)).all()
    return jsonify({'conversations':[conversation.serialize() for conversation in conversations]}), 200


@socketio.on('init_chat')
@jwt_required()
def on_init(data):
    current_user = get_jwt_identity()
    to_user = data.get('to_user')

    find_conversation = find_existing_conversation(current_user, to_user)
    if find_conversation:
        return emit('init_chat', {'msg': 'error', 'error': 'La conversación ya existe', 'conversation': find_conversation.serialize()})

    conversation = create_new_conversation(current_user, to_user)
    if conversation:
        emit('init_chat', {'msg': 'ok', 'conversation': conversation.serialize()})
    else:
        emit('init_chat', {'msg': 'error', 'error': 'Error al crear la conversación'})

def find_existing_conversation(user1, user2):
    return Conversation.query.filter(Conversation.users.any(id=user1.id)).filter(Conversation.users.any(id=user2.id)).first()

def create_new_conversation(user1, user2):
    try:
        conversation = Conversation()
        conversation.created_at = datetime.datetime.now()
        conversation.users.extend([user1, user2])

        conversation_user1 = Conversation_User()
        conversation_user1.conversation_id = conversation.id
        conversation_user1.user_id = user1.id
        conversation_user2 = Conversation_User()
        conversation_user2.conversation_id = conversation.id
        conversation_user2.user_id = user2.id

        db.session.add(conversation)
        db.session.add(conversation_user1)
        db.session.add(conversation_user2)
        db.session.commit()

        return conversation
    except Exception as e:
        db.session.rollback()
        print('Error al crear la conversación:', str(e))
        return None
