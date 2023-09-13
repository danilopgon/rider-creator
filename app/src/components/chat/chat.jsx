import { useState, useEffect, useRef } from "react";
import { GrSend } from "react-icons/gr";
import { AiOutlineArrowLeft } from "react-icons/ai";

import { ChatStart } from "./ChatStart";
import { ChatEnd } from "./ChatEnd";

export const Chat = ({ store, actions }) => {
  const [showChat, setShowChat] = useState(false);

  const { selectConversation, toUser } = store;

  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [store.newMessage, store.listMessagesByConversation]);

  useEffect(() => {
    if (selectConversation === null) {
      setShowChat((prev) => !prev);
    }
    if (selectConversation !== null) {
      if (showChat === false) {
        setShowChat((prev) => !prev);
      }
      if (selectConversation == "" || selectConversation == null) {
        setSelectConversation(null);
      }
      const findUser = store.listChatByMyUser.find(
        (chat) => String(chat.id) === String(selectConversation)
      );
      if (findUser?.user_id1 === store.myUser?.id) {
        actions.setToUser(findUser?.user2_serialized);
      } else {
        actions.setToUser(findUser?.user1_serialized);
      }
    }
    if (selectConversation === null) {
      setShowChat(false);
    }
  }, [selectConversation]);

  return (
    <section
      className={`max-h-screen p-2 w-[100%] md:w-[80%] md:relative ${
        showChat ? "" : "hidden"
      } animate-fade-left`}
    >
      <div className="w-full h-full rounded-xl md:bg-base-200 bg-base-200">
        <div className="w-full h-full">
          <div className="flex p-1">
            <button
              className="p-2 mt-2 me-auto"
              onClick={() => actions.setSelectConversation(null)}
            >
              <AiOutlineArrowLeft />
            </button>
            <span className="flex items-center p-2 text-xl">
              {store.toUser?.username}
            </span>
            {store.toUser?.img !== null && store.toUser?.img !== "" ? (
              <img
                className="w-8 h-8 mt-2 rounded me-4"
                src={store.toUser?.img}
                alt="img profile"
              />
            ) : (
              <div className="flex items-center justify-center w-8 h-8 mt-2 text-2xl text-white border-0 rounded me-2 bg-base-200">
                {store?.toUser?.username.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="w-full h-full p-3">
            <div
              className="chat-container w-full h-[26rem] overflow-y-auto scrollbar-thin"
              ref={chatContainerRef}
            >
              {store.listMessagesByConversation?.length > 0 ? (
                store.listMessagesByConversation?.map((message) => {
                  if (message?.user_id === store.myUser?.id) {
                    return (
                      <ChatEnd message={message?.content} key={message?.id} />
                    );
                  } else {
                    return (
                      <ChatStart message={message?.content} key={message?.id} />
                    );
                  }
                })
              ) : (
                <p className="text-center">No hay mensajes</p>
              )}
            </div>
          </div>
          <div className="flex items-center justify-center w-full">
            <input
              onChange={actions.handleCaptureMessageInput}
              value={store.newMessage}
              className="w-full p-2  rounded-s bg-base-200 input input-primary input-bordered"
              type="text"
            />
            <button
              onClick={actions.handleSendMessage}
              className="h-full  xl:w-[8%] md:w-[18%]  flex items-center gap-2 rounded-e btn btn-primary"
            >
              <GrSend />
              Send
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
