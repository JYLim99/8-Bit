import firebase from 'firebase'
import store from '../../redux/store'
import React, { useState } from 'react';
import { db } from '../../config/firebase'
import styles from './Chat.module.css'

const SendMessage = () => {

    let handle = store.getState().user.credentials.handle;
    const [text, setText] = useState("")

    async function sendMessage(e) {
        e.preventDefault()
        await db.collection('messages').add({
            handle,
            text: text,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        setText('')
    }
    
    return(
        <div>
            <form onSubmit={sendMessage}>
                <div className={styles.sendMsg}>
                    <input className={styles.input} maxLength="150" placeholder='Send Message (Max length 150 characters)' type="text" value={text} onChange={e => setText(e.target.value)} />
                    <button className={styles.button} type="submit">Send</button>
                </div>
            </form>
        </div>
    )
}

export default SendMessage;