


import { createContext, useContext } from "react";
import { useState, useEffect } from "react";


const ChatContext = createContext();


export const ChatProvider = ({ children }) => {

    


      
    return(
        <ChatContext.Provider value={{}}>
            {children}
        </ChatContext.Provider>
    )
}
const useChat = () => useContext(ChatContext);
export default useChat;