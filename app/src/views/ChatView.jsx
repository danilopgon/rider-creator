import { Chat } from "../components/chat/Chat"
import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Contacts } from "../components/chat/Contacts"
import { v4 as uuidv4 } from 'uuid';
import useLogin from "../context/LoginContext";
import jwt_decode from "jwt-decode";

import getUserByUserName from "../services/getUserByUserName";

const socket = io('http://localhost:10000')

export const ChatView = () => {
    const token = localStorage.getItem('jwt-token')
    const decoded = jwt_decode(token)

    
    const [myUser, setMyUser] = useState(decoded.sub)
    const [newMessage, setNewMessage] = useState('');
    const [listFindUser, setListFindUser] = useState([]);
    const [listChatByMyUser, setListChatByMyUser] = useState(null);
    const [selectConversation, setSelectConversation] = useState(null);
    const [listMessagesByConversation, setListMessagesByConversation] = useState(null);
    const [toUser, setToUser] = useState(null);

    console.log(decoded)
    console.log(myUser)

    useEffect(() => {
        socket.on('connect', () => {
          console.log('Conectado al servidor de Socket.IO');
        });

        socket.on('message', (data) => {
          console.log('Mensaje recibido:', data);
          const msg = async  () => {
            await setListMessagesByConversation(getMessages(selectConversation?.id))
          }
          msg()
        });

        socket.on('chat', (data) => {
            if (data.msg === "ya existe esta conversacion") {
                 toast.error('Ya existe esta conversacion')
                 const conversation = listChatByMyUser.find((chat) => String(chat.id) === String(data?.data?.id))
                 setSelectConversation(conversation?.id)
             }
        })

        socket.on('get_chat', (data) => {
            console.log('Chat recibido:', data);
            if(data.msg === 'error'){
                toast.error('No se pudo obtener el chat')
                return
            }
            const get_chat = async () => {
            await setListMessagesByConversation(data.data)
            }
            get_chat()
        })

        socket.on('get_chats', (data) => {
          console.log(data)
          data.data.length > 0 && setListChatByMyUser(data.data)
            
         
          getChats()
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
        if(message === ''){
            toast.error('No puedes enviar un mensaje vacio');
            return
        }
        if(message === null || user_id === null || conversation_id === null){
            return
        }
        const data = {
            "content": message,
            "user_id": user_id,
            "conversation_id": conversation_id
        }
        socket.emit('message',  data);
      }

      console.log(myUser?.id)

      const getMessages = (conversation_id=null) => {
        if(conversation_id === null){
            return
        }
        const data = {"conversation_id":conversation_id}
        socket.emit('get_chat', data);
      }

      const getChats = (user_id=null) => {
        if(user_id === null){
            return
        }
        const data = { "user_id":user_id}
        socket.emit('get_chats', data);
      }

      const handleCaptureMessageInput = (e) => {
        try{
            const {value} = e.target;
            setNewMessage(value);
        }catch(error){
            console.log(error)
        }
      }

      const handleCreateChat = (e) => {
        try{
          const {id} = e.target.parentNode.parentNode;
                 const to_user = listFindUser.find((user) => parseInt(user.user.id) === parseInt(id));
                 if(to_user.user.id === myUser.id){
                     toast.error('No puedes chatear contigo mismo');
                     return
                 }
                 createChat(parseInt(myUser.id),parseInt(to_user.user.id))

             }catch(error){
                 console.log(error)
             }
       }

        const handleSelectChat = (e) => {
            try{
                const {id} = e.target.parentNode.parentNode;
                if(id === null || id === undefined|| id === '') return;
                
                
                if(selectConversation !== null || selectConversation !== undefined || selectConversation !== ''){
                  if(selectConversation !== id){  
                    setSelectConversation(id);
                  }
                  
                }
                getMessages(id?.chat_id)
                return 
            }catch(error){
                console.log(error)
            }
       }
       

       const handleSendMessage = (e) => {
        try{

            sendMessage(newMessage, myUser?.id, selectConversation)
            setNewMessage('')
        }catch(error){
            console.log(error)
        }
       }

       
       const handleFindUserByUserName = (e) => {
        try{
            const userName = e.target.value;
            getUserByUserName(userName).then((users) => {
                if(users.length === 0) return;
                if(users.length > 0){
                    setListFindUser(users);
                }
            })

        }catch(error){
            console.log(error)
        }

    }

    useEffect(() => {
        if(myUser === null) return;
        if(myUser?.id === null) return;
        if(myUser?.id === undefined) return;
        getChats(myUser?.id)
       
    },[myUser, selectConversation, listChatByMyUser])
    
    useEffect(() => {
      if(selectConversation === null) return;
      if(selectConversation === undefined) return;
      getMessages(selectConversation)
    },[selectConversation, sendMessage, createChat, listChatByMyUser])

    const store = {
        myUser,
        listFindUser,
        listChatByMyUser,
        selectConversation,
        listMessagesByConversation,
        toUser,
        newMessage
        

    }

    const actions = {
        handleCreateChat,
        handleSelectChat,
        handleSendMessage,
        handleFindUserByUserName,
        listChatByMyUser,
        setSelectConversation,
        setToUser,
        handleCaptureMessageInput


    }
    
    return(
            <section className="flex w-screen h-[38rem] max-h-screen">
                <Contacts store={store} actions={actions}/>
                <Chat store={store} actions={actions}/>
            </section>
    )
}