import { useState, useEffect } from 'react';
import {GrSend} from 'react-icons/gr'
import {AiOutlineArrowLeft} from 'react-icons/ai'
import useChat from '../../context/ChatContext';


export const Chat = () => {
    const [showChat, setShowChat] = useState(false)

    const {store:storeChat, actions: actionsChat} = useChat()
    const {selectConversation} = storeChat
    const {setSelectConversation} = actionsChat 
    const [toUser, setToUser] = useState(null)
    console.log(selectConversation)
    console.log(toUser)


    useEffect(() => {
    if(selectConversation !== null){
        if(showChat===false){
            
            setShowChat(prev => !prev)
        }
        if(selectConversation == ''|| selectConversation == null){
            return
        }
        if(toUser !== JSON.parse(selectConversation)){
        setToUser(JSON.parse(selectConversation))
    }
}
},[selectConversation])
        
    
     return (
        <section className={`h-full p-2 w-[100%] absolute md:w-[80%] md:relative ${showChat?'':'hidden'}`}>
            <div className="w-full h-full rounded-xl bg-slate-50/5">
                <div className="w-full h-full">
                    
                    <div className='flex p-1'>
                    <button className='p-2 me-auto'><AiOutlineArrowLeft/></button>
                    <span className='flex items-center p-2'>{toUser?.name}</span>
                    {toUser?.img!==''?<img src={toUser?.img} alt="" />:<div className="flex items-center justify-center w-10 h-10 text-2xl text-black rounded bg-slate-50/10 bg-slate-300">{toUser?.name.charAt(0).toUpperCase()}</div>}
            
                    </div>
                    <div className="w-full h-[80%] p-3">
                        
                        <div className='w-full h-full'>
                        <div className="chat chat-start">
                            <div className="text-black chat-bubble bg-slate-300 w-[40%]">It's over Anakin, <br/>I have the high ground.</div>
                        </div>
                        <div className="chat chat-end">
                            <div className="text-black chat-bubble bg-slate-300 w-[40%]">You underestimate my power!</div>
                        </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center w-full">
                        <input className="w-[70%] p-2  rounded-s bg-slate-200" type="text" />
                        <button className="h-full  xl:w-[8%] md:w-[18%] bg-slate-200 flex items-center p-2 gap-2 rounded-e"><GrSend/>Send</button>
                    </div>
                </div>
            </div>
        </section>
    )
}