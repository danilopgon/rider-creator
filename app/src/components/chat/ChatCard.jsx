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
    <article
      onClick={actions.handleSelectChat}
      className="flex overflow-hidden h-14 bg-base-100/5 hover:bg-base-100/10"
      id={chat.id}
      key={user?.chat_id}
    >
      <div className="min-w-[20%] h-full p-1">
        {user?.img !== null ? (
          <img className="w-full h-full rounded" src={user?.img} alt="" />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-2xl font-bold text-base-content bg-success rounded">
            {user?.username?.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <div className="overflow-hidden">
        <h2 className="font-semibold ms-3">{user?.username}</h2>
        <p className="p-0 m-0 mt-1 overflow-hidden ms-3">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam
          optio corrupti quam, numquam harum quis. Totam nisi quasi nostrum,
          illum ex ad molestias dolor praesentium sunt id neque minima sapiente!
        </p>
      </div>
    </article>
  );
};
