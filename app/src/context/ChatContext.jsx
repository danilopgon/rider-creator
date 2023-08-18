
import getUserByUserName from "../services/getUserByUserName";
import { toast } from 'react-hot-toast';
import useLoginContext from "./LoginContext";
import { createContext, useContext } from "react";
import { useState, useEffect } from "react";


const ChatContext = createContext();


export const ChatProvider = ({ children }) => {

    const {store: storeLoginContext} = useLoginContext();
    const {myUser} = storeLoginContext;


    const [listFindUser, setListFindUser] = useState([]);
    const [listChatByMyUser, setListChatByMyUser] = useState(null);
    const [selectConversation, setSelectConversation] = useState(null);
    const [listMessagesByConversation, setListMessagesByConversation] = useState(null);




    // const handleFindUserByUserName = (e) => {
    //     try{
    //         const userName = e.target.value;
    //         getUserByUserName(userName).then((users) => {
    //             if(users.length === 0) return;
    //             if(users.length > 0){
    //                 setListFindUser(users);
    //             }
    //         })
            
    //     }catch(error){
    //         console.log(error)
    //     }
        
    // }

    // const handleCreateChat = (e) => {
    //     try{
    //         const {id} = e.target.parentNode.parentNode;
    //         const to_user = listFindUser.find((user) => parseInt(user.user.id) === parseInt(id));
    //         if(to_user.user.id === myUser.id){
    //             toast.error('No puedes chatear contigo mismo');
    //             return 
    //         }
            
    //         const response = createConversation(parseInt(myUser.id),parseInt(to_user.user.id), myUser.username, to_user.user.username, myUser.img, to_user.user.img)
    //         console.log(response)
            
    //     }catch(error){
    //         console.log(error)
    //     }
    // }

    // const handleSelectChat = (e) => {
    //     try{
    //         const {id} = e.target.parentNode.parentNode;
            
    //         setSelectConversation(id);
    //         //getMessagesByConversation(conversation.id)

    //         console.log(selectConversation.json())
    //     }catch(error){
    //         console.log(error)
    //     }
    // }
   
    

    

    const store = {
    //     myUser,
    //    listFindUser,
    //    listChatByMyUser,
    //     selectConversation,

    }

    const actions = {
        // handleFindUserByUserName,
        // handleCreateChat,
        // handleSelectChat

    }


      
    return(
        <ChatContext.Provider value={{store, actions}}>
            {children}
        </ChatContext.Provider>
    )
}
const useChat = () => useContext(ChatContext);
export default useChat;