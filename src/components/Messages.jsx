import React, { useEffect, useState } from 'react'
import { doc , onSnapshot } from "firebase/firestore"
import useChat from '../custom-hook/useChat'
import { db } from '../fireConfig'
import Message from './Message'

function Messages() {
  const [messages, setMessages] = useState([])
  const { data } =useChat()

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatId), doc => {
      doc.exists() && setMessages(doc.data().messages)
    }) 

    return () => {
      unsub()
    }
  }, [data.chatId])
  return (
    <div className="messages">
      {
        messages?.map((item,index) => {
            <Message key={index} msg={item} />
        })
      }
    </div>
  )
}

export default Messages