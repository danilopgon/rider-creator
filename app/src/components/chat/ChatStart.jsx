export const ChatStart = ({message}) => {
    return (
        <div className="chat chat-start ">
            <div className="text-black chat-bubble bg-slate-300 w-[40%]">{message}</div>
        </div>
    )
}