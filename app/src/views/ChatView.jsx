import { Chat } from "../components/chat/Chat"
import { ChatProvider } from "../context/ChatContext"
import io from 'socket.io-client';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Contacts } from "../components/chat/Contacts"
import { v4 as uuidv4 } from 'uuid';

const socket = io('http://localhost:10000')

export const ChatView = () => {

    useEffect(() => {
        socket.on('connect', () => {
          console.log('Conectado al servidor de Socket.IO');
        });
    
        socket.on('message', (data) => {
          console.log('Mensaje recibido:', data);
        });
        
        socket.on('chat', (data) => {
            console.log('Chat recibido:', data);
        })

        socket.on('get_chat', (data) => {
            console.log('Chat recibido:', data);
        })

        return () => {
          socket.off('chat_message');
          socket.off('connect');
        };
      }, []);


      const createChat = (user_id1=null, user_id2=null) => {
        if(user_id1 === null || user_id1 === null){
            toast.error('Faltan datos para crear el chat');
            return
        }
        const uuid = uuidv4()
        const data = { "user_id1":user_id1, "user_id2":user_id2, "id":uuid}
        socket.emit('chat', data);
      }

      const sendMessage = (message=null, user_id=null, conversation_id=null) => {
        if(message === null || user_id === null || conversation_id === null){
            toast.error('Faltan datos para enviar el mensaje');
            return
        }
        const data = {
            "content": message,
            "user_id": user_id,
            "conversation_id": conversation_id
        }
        socket.emit('message',  data);
      }

      const getChats = (user_id=null, conversation_id=null) => {
        if(user_id === null || conversation_id === null){
            toast.error('Faltan datos para obtener el chat');
            return
        }
        const data = { "user_id":user_id, "conversation_id":conversation_id}
        socket.emit('get_chat', data);
      }  
      
      createChat(1,2);

      //sendMessage('Hola desde el cliente', 1, 1);
      
      //getChats(1,2);
    
    return(
        <ChatProvider>
            <section className="flex w-screen h-[38rem] max-h-screen">
                <Contacts/>
                <Chat/>
            </section>
        </ChatProvider>
    )
}