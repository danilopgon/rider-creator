import { ChatCard } from "./ChatCard"
import { CardUserBand } from "../CardUserBand"

import useChat from "../../context/ChatContext"
import { CardFindUser } from "./CardFindUser"
export const Contacts = () => {

    const {store: storeChat, actions: actionsChat} = useChat()
    
    console.log(storeChat?.listChatByMyUser)
    return (
        <section className="w-[100%] md:w-[45%] lg:w-[30%] xl:w-[20%] full h-full p-2 overflow-hidden">
            <div className="w-full h-full rounded-xl bg-slate-50/5">
                <div className="p-2 text-xl font-semibold text-center">
                    <h2 className="">Contacts</h2>
                </div>
                <div className="flex justify-center w-full p-3">
                    <div className="flex w-full gap-2">
                        <input  className="w-[80%] p-2 text-xl text-black rounded bg-slate-200" type="text" />
                        <button className=" w-[15%] btn btn-primary" onClick={()=>window.my_modal_3.showModal()}>+</button>
                    </div>
                    
                    
                </div>
                <div className="flex flex-col items-center w-full h-full gap-1">
                    {storeChat.listChatByMyUser ===null ? <span className="loading loading-spinner text-secondary"></span>:storeChat?.listChatByMyUser?.items?.length>0? storeChat?.listChatByMyUser?.items?.map((chat) => {
                        console.log(chat.id)
                        return <ChatCard chat={chat} key={chat.id}/>
                    }): <p className="text-center">No tienes chats</p>}
                </div>
            </div>

            
            <dialog id="my_modal_3" className="modal">
                <form method="dialog" className="text-black modal-box bg-slate-300">
                    <button className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">✕</button>
                    <h3 className="text-lg font-bold">Quieres crear un nuevo chat?</h3>
                    <label htmlFor="findUserById"></label>
                    <div className="flex items-center justify-center w-full p-3">
                        <input onChange={actionsChat.handleFindUserByUserName} name="findUserById" type="text" className="w-[70%] p-2 rounded" placeholder="Busca un usuario"/>
                    </div>
                    <div className="flex flex-col justify-center w-full h-24 overflow-y-auto">
                        {storeChat.listFindUser.length>0? storeChat.listFindUser?.map((user) => {
                            return <CardFindUser user={user} key={user?.user?.id}/>
                        }) : <p className="text-center">No se encontraron usuarios</p>}
                    </div>
                    
                    
                    </form>
            </dialog>
        </section>
    )
}