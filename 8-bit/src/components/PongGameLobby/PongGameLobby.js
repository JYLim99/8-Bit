import React from 'react'
import { usePongContext } from '../PongMultiplayer/PongContext'
import styles from './PongGameLobby.module.css'

const PongGameLobby = () => {

    const { handleJoinRoom,  
            createRoom,
            handleInputID } = usePongContext()

    return (
        <div className={styles.container}>
            <button className={styles.createRoomButton} onClick={createRoom}> Create room </button>
            <br />
            <input className={styles.inputField} type="text" placeholder="Input room id" onChange={handleInputID}></input>
            <button className={styles.joinRoomButton} onClick={handleJoinRoom}> Join Room </button>
            <h1 className={styles.header}> Instructions </h1>
            <div className={styles.instructions}> 1) Click on create room </div>
            <div className={styles.instructions}> 2) Send the room id to your friend to join and wait </div>
            <div className={styles.instructions}> 3) Type the room id into the input field (For people joining with room id) </div>
            <div className={styles.instructions}> 4) Click on join room (For people joining with room id) </div>
            <div className={styles.instructions}> 5) Enjoy! </div>
        </div>
    );
}
 
export default PongGameLobby;