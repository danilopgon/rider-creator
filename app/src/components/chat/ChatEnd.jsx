export const ChatEnd = ({ message }) => {
    return (
        <div className="chat chat-end">
            <div className="text-black chat-bubble bg-slate-300 w-[40%]">{message}</div>
        </div>
    )
}