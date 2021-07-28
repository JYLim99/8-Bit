import React, { useState, useEffect, useRef } from 'react'
import { db } from '../../config/firebase'
import SendMessage from './SendMessage'
import styles from './Chat.module.css'

const Chat = () => {
  const scrollRef = useRef()
  const [messages, setMessages] = useState([])

  // Enable automatic scrolling according to latest message
  const scrollToBottom = () => {
    scrollRef.current.scrollIntoView({ block: 'end', behavior: 'smooth' })
  }

  // Retrieve 15 more recent messages according to timestamp
  useEffect(() => {
    db.collection('messages')
      .orderBy('createdAt', 'desc')
      .limit(15)
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()))
      })
  }, [])

  // Trigger every time messages update
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div>
      <div className={styles.chatContainer}>
        <div className={styles.header}> Superchat </div>
        <div>
          {messages
            .slice(0)
            .reverse()
            .map(({ id, text, handle }) => (
              <div>
                <div>
                  <span className={styles.handle}> {`${handle}: `}</span>
                  <span className={styles.msg}> {text} </span>
                </div>
              </div>
            ))}
        </div>
      </div>
      <SendMessage />
      <div ref={scrollRef} />
    </div>
  )
}

export default Chat
