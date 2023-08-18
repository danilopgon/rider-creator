import { Chat } from "../components/chat/Chat"
import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Contacts } from "../components/chat/Contacts"
import { v4 as uuidv4 } from 'uuid';
import useLogin from "../context/LoginContext";

import getUserByUserName from "../services/getUserByUserName";

const socket = io('http://localhost:10000')

export const ChatView = () => {


    const {store: storeLogin} = useLogin();
    const {myUser} = storeLogin;


    const [listFindUser, setListFindUser] = useState([]);
    const [listChatByMyUser, setListChatByMyUser] = useState(null);
    const [selectConversation, setSelectConversation] = useState(null);
    const [listMessagesByConversation, setListMessagesByConversation] = useState(null);
    const [toUser, setToUser] = useState(null);

    useEffect(() => {
        socket.on('connect', () => {
          console.log('Conectado al servidor de Socket.IO');
        });

        socket.on('message', (data) => {
          console.log('Mensaje recibido:', data);
        });

        socket.on('chat', (data) => {
            if (data.msg === "ya existe esta conversacion") {
                 toast.error('Ya existe esta conversacion')
                 setSelectConversation(data.data?.id)
             }
        })

        socket.on('get_chat', (data) => {
            console.log('Chat recibido:', data);
        })

        socket.on('get_chats', (data) => {
          if(listChatByMyUser?.length !== data.data?.length){
            setListChatByMyUser(data.data)
          }

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

      const getMessages = (user_id=null, conversation_id=null) => {
        if(user_id === null || conversation_id === null){
            toast.error('Faltan datos para obtener el chat');
            return
        }
        const data = { "user_id":user_id, "conversation_id":conversation_id}
        socket.emit('get_chat', data);
      }

      const getChats = (user_id=null) => {
        if(user_id === null){
            toast.error('Faltan datos para obtener el chat');
            return
        }
        const data = { "user_id":user_id}
        socket.emit('get_chats', data);
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
                  if(JSON.parse(selectConversation) !== JSON.parse(id)){  
                    setSelectConversation(id);
                  }
                  
                }
                return 
            }catch(error){
                console.log(error)
            }
       }

       

       const handleSendMessage = (e) => {
        try{

            sendMessage(e.target.value, myUser.id, selectConversation?.id)

        }catch(error){
            console.log(error)
        }
       }

       useEffect(() => {
        getMessages(myUser.id, selectConversation?.id)
       }, [myUser])


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

      //createChat(1,2);
      
      //sendMessage('Hola desde el cliente', 1, 1);

      //getChats(1,2);
       getChats(1);

    const store = {
        myUser,
        listFindUser,
        listChatByMyUser,
        selectConversation,
        listMessagesByConversation,
        toUser

    }

    const actions = {
        handleCreateChat,
        handleSelectChat,
        handleSendMessage,
        handleFindUserByUserName,
        listChatByMyUser,
        setSelectConversation,
        setToUser


    }
    
    return(
            <section className="flex w-screen h-[38rem] max-h-screen">
                <Contacts store={store} actions={actions}/>
                <Chat store={store} actions={actions}/>
            </section>
    )
}