from utils.socket_io import socketio
from flask_socketio import emit, join_room, leave_room

import json
from flask import jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.conversations import Conversation
from models.conversation_user import Conversation_User
from models.message import Message
import datetime
from utils.db import db






@socketio.on('connect')
def on_connect():
    print('Usuario conectado:')


    
    
@socketio.on('message')
def on_message(data):
    if data is None:
        emit('message', {'msg': 'error', 'data': 'No se recibio data'}, broadcast=True)
    if data['content'] is None or data['content'] == '':
        emit('message', {'msg': 'error', 'data': 'No se recibio contenido'}, broadcast=True)
    if data['conversation_id'] is None:
        emit('message', {'msg': 'error', 'data': 'No se recibio conversation_id'}, broadcast=True)
    if data['user_id'] is None:
        emit('message', {'msg': 'error', 'data': 'No se recibio user_id'}, broadcast=True)
    
    message = Message()
    message.content = data['content']
    message.conversation_id = data['conversation_id']
    message.user_id = data['user_id']
    message.created_at = datetime.datetime.now()
    db.session.add(message)
    db.session.commit()
    
    find_conversation = Conversation.query.filter_by(id=data['conversation_id']).first()
    find_conversation['updated_at'] = datetime.datetime.now()
    db.session.add(find_conversation)
    db.session.commit()
    emit('message', {'msg': 'ok', 'data': message}, broadcast=True)
    
    
@socketio.on('chat')
def on_chat(data):
    if data is None:
        emit('chat', {'msg': 'error', 'data': 'No se recibio data'}, broadcast=True)    
    if data['user_id1'] is None or data['user_id2'] is None:
        emit('chat', {'msg': 'error', 'data': 'No se recibio user_id1'}, broadcast=True)
    
    find_conversation = Conversation.query.filter_by(user_id1=data['user_id1'], user_id2=data['user_id2']).first()
    if find_conversation is not None:
        emit('chat', {'msg': 'ya existe esta conversacion', 'data': find_conversation.serialize()}, broadcast=True)
    
    conversation = Conversation()
    conversation.user_id1 = data['user_id1']
    conversation.user_id2 = data['user_id2']
    conversation.created_at = datetime.datetime.now()
    conversation.updated_at = datetime.datetime.now()
    db.session.add(conversation)
    db.session.commit()
    
    find_message_by_conversation = Message.query.filter_by(conversation_id=conversation.id).all()
    
    emit('chat', {'msg': 'ok', "chat": conversation,"messages": [message.serialize() for message in find_message_by_conversation]}, broadcast=True)

@socketio.on('get_chat')
def on_get_chat(data):
    if data is None:
        emit('get_chat', {'msg': 'error', 'data': 'No se recibio data'}, broadcast=True)
    if data['conversation_id'] is None:
        emit('get_chat', {'msg': 'error', 'data': 'No se recibio conversation_id'}, broadcast=True)
    if data['user_id'] is None:
        emit('get_chat', {'msg': 'error', 'data': 'No se recibio user_id'}, broadcast=True)
    
    find_conversation = Conversation.query.filter_by(id=data['conversation_id']).first()
    if find_conversation is None:
        emit('get_chat', {'msg': 'No se encontraron chats', 'data': []}, broadcast=True)
        return    
    find_message_by_conversation = Message.query.filter_by(conversation_id=data['conversation_id']).all()
    if len(find_message_by_conversation) > 0:    
        find_conversation['messages'] = [message.serialize() for message in find_message_by_conversation]
    emit('get_chat', {'msg': 'ok', 'data': find_conversation}, broadcast=True)
    


