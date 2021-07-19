import React, { useState, useEffect, useRef } from 'react'
import { db } from '../../config/firebase'
import SendMessage from './SendMessage'
import styles from './Chat.module.css'

const Chat = () => {
  const scrollRef = useRef()
  const [messages, setMessages] = useState([])

  const scrollToBottom = () => {
    scrollRef.current.scrollIntoView({ block: 'end', behavior: 'smooth' })
  }

  useEffect(() => {
    db.collection('messages')
      .orderBy('createdAt', 'desc')
      .limit(15)
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()))
      })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div>
      <div className={styles.chatContainer}>
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
