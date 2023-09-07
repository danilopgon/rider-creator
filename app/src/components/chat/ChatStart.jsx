export const ChatStart = ({ message }) => {
  return (
    <div className="chat chat-start ">
      <div className="text-base-content chat-bubble bg-base-100 w-[40%]">
        {message}
      </div>
    </div>
  );
};
