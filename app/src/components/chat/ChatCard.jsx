import useLoginContext from "../../context/LoginContext";

import { useState, useEffect } from "react";

export const ChatCard = ({ chat, store, actions }) => {
  const [user, setUser] = useState({});

  //const {store:storeChat, actions:actionsChat} = useChat()
  const { store: storeLogin } = useLoginContext();
  const { myUser } = storeLogin;

  useEffect(() => {
    if (chat === null || chat === undefined) return;
    if (myUser === null || chat === undefined) return;
    if (chat?.user_id1 === null || chat?.user_id1 === undefined) return;

    if (parseInt(chat?.user_id1) === parseInt(myUser?.id)) {
      setUser({ ...chat?.user2_serialized, chat_id: chat?.id });
    } else {
      setUser(chat?.user1_serialized);
      actions.setToUser({ ...chat?.user1_serialized, chat_id: chat?.id });
    }
  }, [chat, myUser]);

  return (
    <button
      onClick={actions.handleSelectChat}
      className="flex items-center w-full rounded p-2 overflow-hidden h-20 bg-base-300 hover:shadow-sm hover:shadow-primary hover:-translate-y-1 transform transition-all"
      id={chat.id}
      key={user?.chat_id}
    >
      {user?.img !== null ? (
        <img className="w-20 p-3 h-full rounded" src={user?.img} alt="" />
      ) : (
        <div className="flex items-center justify-center w-20 h-full text-2xl font-bold text-base-content bg-success rounded">
          {user?.username?.charAt(0).toUpperCase()}
        </div>
      )}

      <div className="ms-3 overflow-hidden w-full text-left">
        <h2 className="font-semibold ">{user?.username}</h2>
        <p className="p-0 m-0 mt-1 overflow-hidden">
          {chat.messages[chat.messages.length - 1]?.content}
        </p>
      </div>
    </button>
  );
};
