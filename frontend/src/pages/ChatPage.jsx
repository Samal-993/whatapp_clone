
import React from 'react'
import { useChatStore } from '../store/useChatStore.js'
import BorderAnimatedContainer from '../component/BorderAnimatedContainer';
import ProfileHeader from '../component/ProfileHeader.jsx';
import ActiveTabSwitch from '../component/ActiveTabSwitch.jsx';
import ContactList from '../component/ContactList.jsx';
import NoConversationPlaceholder from '../component/NoConversationPlaceholder.jsx';
import ChatsList from '../component/ChatsList.jsx';
import ChatContainer from '../component/ChatContainer.jsx';

const ChatPage = () => {
  const {activeTab, selectedUser} = useChatStore();
  return (
    <div className='relative w-full max-w-6xl h-[800px]'>
      <BorderAnimatedContainer>
        {/* LEFT SIDE */}
        <div className='w-80 bg-slate-800/50 backdrop-blue-sm flex flex-col '>
        <ProfileHeader/>
        <ActiveTabSwitch/>
        <div className='flex-1 overflow-y-auto p-4 space-y-2'>
          {activeTab === "chats" ? <ChatsList/>:<ContactList/>}

        </div>

        </div>
        {/* RIGHT SIDE */}
        <div className='flex-1 flex flex-col bg-slate-900/50 backdrop-blue-sm' >
        {selectedUser ? <ChatContainer/>:<NoConversationPlaceholder/>}
        </div>
      </BorderAnimatedContainer>
      chatgpt
     <button >Logout</button>
    </div>
  )
}

export default ChatPage
