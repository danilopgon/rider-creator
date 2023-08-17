import { Chat } from "../components/chat/Chat"
import { ChatProvider } from "../context/ChatContext"


export const ChatView = () => {
    
    return(
        <ChatProvider>
            <Chat/>
        </ChatProvider>
    )
}