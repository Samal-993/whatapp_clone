import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceHolder from "./NoChatHistoryPlaceHolder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";
const ChatContainer = () => {
  const { selectedUser, getMessagesByUserId, messages } = useChatStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    getMessagesByUserId(selectedUser._id);
  }, [selectedUser, getMessagesByUserId]);
  return (
    <div>
      <ChatHeader />
      <div className="flex-1 px-6 overflow-y-auto py-8">
        {messages.length > 0 ? (
          <div
            key={messages._id}
            className={`chat ${
              messages.senderId === authUser._id ? "chat-end" : "chat-start"
            }`}
          >
            <div
              className={`chat-bubble relative ${
                messages.senderId === authUser._id
                  ? "bg-cyan-600 text-white"
                  : "bg-slate-800 text-slate-200"
              }`}
            >
              {msg.image &&  (
                <img src={msg.image} alt="Shared" className="rounded-lg h-48 object-cover"/>
              )}
              {msg.text && <p className="mt-2">{msg.text}</p>}

              <p className="text-xs mt-1 opacity-75 flex items-center gap-1 ">
                {new Date(msg.createdAt).toISOString().slice(11, 16)}
              </p>
            </div>
          </div>
        ) : isMessagesLoading ? <MessagesLoadingSkeleton/> :(
          <NoChatHistoryPlaceHolder name={selectedUser.fullname} />
        )}
      </div>
      <MessageInput/>
    </div>
  );
};

export default ChatContainer;
