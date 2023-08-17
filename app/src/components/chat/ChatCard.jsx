import useLoginContext from "../../context/LoginContext"
import useChat from "../../context/ChatContext"
import { useState, useEffect } from "react"

export const ChatCard = ({chat}) => {
    const[user, setUser] = useState({})

    //const {store:storeChat, actions:actionsChat} = useChat()
    const {store:storeLogin} = useLoginContext()
    const {myUser} = storeLogin
    const {store:storeChat, actions:actionsChat} = useChat()

    
    useEffect(() => {
        if (parseInt(chat?.user_id1) === parseInt(myUser?.id)) {
          setUser({
            id: chat?.user_id2,
            name: chat?.username2,
            img: chat?.img2,
            chat_id: chat?.id,
          });
        }else{
            setUser({
                id: chat?.user_id1,
                name: chat?.username1,
                img: chat?.img1,
                chat_id: chat?.id,
            });
        }
      }, [chat, myUser]);
    console.log(chat)
    console.log(user)
    
    
     
    return (
        <article onClick={actionsChat.handleSelectChat} className="flex h-14 bg-slate-50/10 hover:bg-slate-50/5" id={JSON.stringify(user)} key={user?.chat_id}>
            <div className="min-w-[20%] h-full p-1">
                {
                    user?.img !== null? <img className="w-full h-full border rounded" src={user?.img} alt="" />
                    : <div className="w-full h-full border rounded bg-slate-50/10"></div>
                }
                
            </div>
            <div className="overflow-hidden">
                <h2 className="font-semibold ms-3">{user?.name}</h2>
                <p className="mt-1 overflow-hidden ms-3">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam optio corrupti quam, numquam harum quis. Totam nisi quasi nostrum, illum ex ad molestias dolor praesentium sunt id neque minima sapiente!</p>
            </div>
        </article>
    )
}