from utils.socket_io import socketio
from flask_socketio import emit, join_room, leave_room

import json
from flask import jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.conversations import Conversation
from models.message import Message
from models.users import User
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
    
    
    
    find_conversation = Conversation.query.filter_by(id=data['conversation_id']).first()
    if find_conversation is not None:
        find_conversation['updated_at'] = datetime.datetime.now()
        db.session.add(find_conversation)
        db.session.commit()
        message = Message()
        message.content = data['content']
        message.conversation_id = data['conversation_id']
        message.user_id = data['user_id']
        message.created_at = datetime.datetime.now()
        db.session.add(message)
        db.session.commit()
        message_data = Message.query.filter_by(id=message.id).first()
        message_dict = {
            "id": message.id,
            "user_id": message.user_id,
            "conversation_id": message.conversation_id,
        }
        print(message_data)
        emit('message', {'msg': 'ok', 'data': message_dict}, broadcast=True)
    if find_conversation is None:
        emit('message', {'msg': 'error', 'data': 'No se encontro la conversacion'}, broadcast=True)
        return
    
    
@socketio.on('chat')
def on_chat(data):
    if data is None:
        emit('chat', {'msg': 'error', 'data': 'No se recibio data'}, broadcast=True)    
    if data['user_id1'] is None or data['user_id2'] is None:
        emit('chat', {'msg': 'error', 'data': 'No se recibio user_id'}, broadcast=True)
    if data['id'] is None:
        emit('chat', {'msg': 'error', 'data': 'No se recibio id'}, broadcast=True)
        
    find_conversation = Conversation.query.filter_by(user_id1=data['user_id1'], user_id2=data['user_id2']).first()
    if find_conversation is not None:
        conversation_serialized = find_conversation.serialize()
        emit('chat', {'msg': 'ya existe esta conversacion', 'data': conversation_serialized}, broadcast=True)
        return
    find_user1 = User.query.filter_by(id=data['user_id1']).first()
    find_user2 = User.query.filter_by(id=data['user_id2']).first()
    if find_user1 is None or find_user2 is None:
        emit('chat', {'msg': 'No se encontro el usuario'}, broadcast=True)
        return
    conversation = Conversation()
    conversation.user_id1 = data['user_id1']
    conversation.user_id2 = data['user_id2']
    conversation.id = data['id']
    db.session.add(conversation)
    db.session.commit()
    
    find_message_by_conversation = Message.query.filter_by(conversation_id=conversation.id).all()
    serialized_conversation = conversation.serialize()
    serialized_message = [message.serialize() for message in find_message_by_conversation]
    emit('chat', {'msg': 'ok', "chat": serialized_conversation,"messages": serialized_message}, broadcast=True)

@socketio.on('get_chat')
def on_get_chat(data):
    if data is None:
        emit('get_chat', {'msg': 'error', 'data': 'No se recibio data'}, broadcast=True)
        return
    if data['conversation_id'] is None:
        emit('get_chat', {'msg': 'error', 'data': 'No se recibio conversation_id'}, broadcast=True)
        return
    if data['user_id'] is None:
        emit('get_chat', {'msg': 'error', 'data': 'No se recibio user_id'}, broadcast=True)
        return
    find_conversation = Conversation.query.filter_by(id=data['conversation_id']).first()
    if find_conversation is None:
        emit('get_chat', {'msg': 'No se encontraron chats', 'data': []}, broadcast=True)
        return    
    find_message_by_conversation = Message.query.filter_by(conversation_id=data['conversation_id']).all()
    if len(find_message_by_conversation) > 0:    
        find_conversation['messages'] = [message.serialize() for message in find_message_by_conversation]
    emit('get_chat', {'msg': 'ok', 'data': []}, broadcast=True)
    

@socketio.on('get_chats')
def on_get_chats(data):
    if data is None:
        emit('get_chats', {'msg': 'error', 'data': 'No se recibio data'}, broadcast=True)
        return
    if data['user_id'] is None:
        emit('get_chats', {'msg': 'error', 'data': 'No se recibio user_id'}, broadcast=True)
        return
    find_conversations = Conversation.query.filter_by(user_id1=data['user_id']).all()
    if find_conversations is None:
        emit('get_chats', {'msg': 'No se encontraron chats', 'data': []}, broadcast=True)
        return
    
    conversations = [conversation.serialize() for conversation in find_conversations]
    for conversation in conversations:
        messages = Message.query.filter_by(conversation_id=conversation['id']).all()
        if len(messages) > 0:    
            conversation['messages'] = [message.serialize() for message in messages]
        user1 = User.query.filter_by(id=conversation['user_id1']).first()
        user2 = User.query.filter_by(id=conversation['user_id2']).first()
        if user1 is not None:
            user1_serialized = user1.serialize_for_jwt()
            conversation['user1_serialized'] = user1_serialized
        

        if user2 is not None:
            user2_serialized = user2.serialize_for_jwt()
            conversation['user2_serialized'] = user2_serialized
        
        
    emit('get_chats', {'msg': 'ok', 'data': conversations}, broadcast=True)
