import { useEffect } from "react"
import { useChatStore } from "../store/useChatStore"
import ChatHeader from "./ChatHeader"
import MessageInput from "./MessageInput"
import MessageSkeleton from "./skeletone/MessageSkeleton"
import { useAuthStore } from "../store/useAuthStore"
import { formatMessageTime } from "../lib/utils"
import { useRef } from "react"

const ChatContainer = () => {

    const { messages,getmessages,ismessagesloading,selecteduser,subscribeTomessages,unsubscribeTomessages } = useChatStore()
    const {authUser} = useAuthStore()
    const messageendref = useRef(null)


    useEffect(()=>{
        getmessages(selecteduser._id)
        subscribeTomessages();

        return () =>{
          unsubscribeTomessages();
        }
    },[selecteduser._id,getmessages,subscribeTomessages,unsubscribeTomessages])

    useEffect(()=>{
      if (messageendref.current && messages) {
      messageendref.current.scrollIntoView({behavior: "smooth"})   
      }
    },[messages])

    if(ismessagesloading) {
    return (
    <div className="flex-1 flex-col overflow-auto">
      <ChatHeader />
      <MessageSkeleton />
      <MessageInput />
    </div>
    )
  }

  return (
    <div className="flex-1 flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4"></div>
      {messages.map((message)=>(
        <div key={message._id} className={`chat ${message.senderID === authUser._id ? "chat-end" : "chat-start"}`}
        ref={messageendref}
        >
          <div className="chat-image avatar">
            <div className="size-10 rounded-full border">
              <img src={message.senderID === authUser._id ? authUser.profilepic || "/avatar.png" : selecteduser.profilepic || "/avatar.png"} 
              alt="pic"/>
            </div>
          </div>
          <div className="chat-header mb-1 ">
          <time className="text-xs opacity-50 ml-1">
            {formatMessageTime(message.createdAt)}
          </time>
          </div>
          <div className="chat-bubble flex flex-col">
            {message.image && (
              <img
              src={message.image}
              alt="attachment"
              className="sm:max-w-50 rounded-md mb-2"
              />
            )}
            {message.text && <p>{message.text}</p>}
          </div>
        </div>
      ))}
      <MessageInput />
    </div>
  )
}

export default ChatContainer