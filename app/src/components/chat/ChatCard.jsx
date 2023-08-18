import useLoginContext from "../../context/LoginContext"
import useChat from "../../context/ChatContext"
import { useState, useEffect } from "react"

export const ChatCard = ({chat, store, actions}) => {
    const[user, setUser] = useState({})

    //const {store:storeChat, actions:actionsChat} = useChat()
    const {store:storeLogin} = useLoginContext()
    const {myUser} = storeLogin

    
    useEffect(() => {
        if (parseInt(chat?.user_id1) === parseInt(myUser?.id)) {
          setUser(chat?.user2_serialized);
        }else{
            setUser(chat?.user1_serialized);
        }
      }, [chat, myUser]);
    
    
    
     
    return (
        <article onClick={actions.handleSelectChat} className="flex h-14 bg-slate-50/5 hover:bg-slate-50/10" id={JSON.stringify(user)} key={user?.chat_id}>
            <div className="min-w-[20%] h-full p-1">
                {
                    user?.img !== null? <img className="w-full h-full border rounded" src={user?.img} alt="" />
                    : <div className="w-full h-full border rounded bg-slate-50/10"></div>
                }
                
            </div>
            <div className="overflow-hidden">
                <h2 className="font-semibold ms-3">{user?.username}</h2>
                <p className="mt-1 overflow-hidden ms-3">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam optio corrupti quam, numquam harum quis. Totam nisi quasi nostrum, illum ex ad molestias dolor praesentium sunt id neque minima sapiente!</p>
            </div>
        </article>
    )
}