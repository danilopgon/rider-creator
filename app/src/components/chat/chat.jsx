import io from 'socket.io-client';
import { useEffect } from 'react';
import toast from 'react-hot-toast';


const socket = io('http://localhost:10000')
export const Chat = () => {


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
        const data = { "user_id1":user_id1, "user_id2":user_id2}
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

      sendMessage('Hola desde el cliente', 1, 1);
      
      getChats(1,2);
      
    return(
        <div>
            <h1 className="text-white border">Chat</h1>
        </div>
    )
}