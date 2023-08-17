import { Chat } from "../components/chat/Chat"
import { ChatProvider } from "../context/ChatContext"


export const ChatView = () => {
    
    return(
        <ChatProvider>
            <section>
                <Chat/>
            </section>
        </ChatProvider>
    )
}