import useChat from "../../context/ChatContext"

export const CardFindUser = ({user}) => {

    const {store: storeChat, actions: actionsChat} = useChat()

    const listColors = ['bg-green-500','bg-orange-600', 'bg-blue-700', 'bg-yellow-500', 'bg-pink-500', 'bg-purple-500', 'bg-red-500', 'bg-indigo-500', 'bg-green-500', 'bg-orange-600', 'bg-blue-700', 'bg-yellow-500', 'bg-pink-500', 'bg-purple-500', 'bg-red-500', 'bg-indigo-500']
    const randomColor = listColors[Math.floor(Math.random() * listColors.length)]
    const firstLetter = user?.user?.username?.[0].toUpperCase()

    return(
        <article key={user?.user?.id} className="w-[60%] flex items-center h-12 bg-black/10 rounded" id={user?.user?.id}>
            <div className="p-1">
                {user?.user?.img !== null?(<img className="w-10 h-10 rounded" src={user?.user?.img} alt="user"/>)
                :(
                    <div className={`h-10 w-10 rounded flex items-center justify-center ${randomColor}`}>
                        <h1 className="text-2xl font-bold">{firstLetter}</h1>
                    </div>
                )}
                
            </div>
            <h2>{user?.user?.username}</h2>

            <div className="p-1 ms-auto">
                <button  onClick={actionsChat.handleCreateChat} className="p-2 rounded bg-[#641ae6]">Chatear</button>
            </div>
        </article>
    )
}