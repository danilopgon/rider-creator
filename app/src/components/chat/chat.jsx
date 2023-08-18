import { useState, useEffect } from 'react';
import {GrSend} from 'react-icons/gr'
import {AiOutlineArrowLeft} from 'react-icons/ai'



export const Chat = ({store, actions}) => {
    const [showChat, setShowChat] = useState(false)

    
    const {selectConversation, toUser} = store
    
    
    console.log(selectConversation)

   

    useEffect(() => {
        if(selectConversation === null){
        setShowChat(prev => !prev)
    }
    if(selectConversation !== null){
        if(showChat===false){
            
            setShowChat(prev => !prev)
        }
        if(selectConversation == ''|| selectConversation == null){
            setSelectConversation(null)
        }
        if(toUser !== JSON.parse(selectConversation)){
        actions.setToUser(JSON.parse(selectConversation))
    } 
}
if(selectConversation === null){
    setShowChat(false)

}
},[selectConversation])
        
    
    
     return (
        <section className={`h-full p-2 w-[100%] absolute md:w-[80%] md:relative ${showChat?'':'hidden'}`}>
            <div className="w-full h-full rounded-xl bg-slate-50/5">
                <div className="w-full h-full">
                    
                    <div className='flex p-1'>
                    <button className='p-2 mt-2 me-auto' onClick={() => actions.setSelectConversation(null)}><AiOutlineArrowLeft/></button>
                    <span className='flex items-center p-2 text-xl'>{store.toUser?.username}</span>
                    {store.toUser?.img !== null && store.toUser?.img !== ''?<img className='w-8 h-8 mt-2 rounded me-4' src={store.toUser?.img} alt="img profile" />:<div className="flex items-center justify-center w-8 h-8 mt-2 text-2xl text-white border-0 rounded me-2 bg-slate-300">{store?.toUser?.username.charAt(0).toUpperCase()}</div>}
            
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