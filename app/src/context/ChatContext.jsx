import io from 'socket.io-client';


import { createContext, useContext } from "react";
import { useState, useEffect } from "react";


const ChatContext = createContext();


export const ChatProvider = ({ children }) => {

    useEffect(() => {
        
        const socket = io('http://localhost:10000'); // Cambia la URL para que coincida con tu servidor Socket.IO
    
        socket.on('connect', () => {
          console.log('Conectado al servidor de Socket.IO');
        });
    
        socket.on('chat_message', (data) => {
          console.log('Mensaje recibido:', data);
        });
    
        return () => {
          socket.disconnect();
        };
      }, []);


      const initChat = (to_user) => {
        const data = '¡Hola, mundo!';
        socket.emit('init_chat', data);
      };

      const sendMessage = () => {
        
        const message = '¡Hola, mundo!';
        socket.emit('send_message', message);
        console.log('Mensaje enviado:', message);
      };

      initChat(2)

    return(
        <ChatContext.Provider value={{}}>
            {children}
        </ChatContext.Provider>
    )
}
const useChat = () => useContext(ChatContext);
export default useChat;