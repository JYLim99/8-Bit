import React from 'react'
import { usePongContext } from '../PongMultiplayer/PongContext'
import styles from './PongGameLobby.module.css'
import { Redirect } from 'react-router-dom'

const PongGameLobby = () => {

    const { handleJoinRoom,  
            createRoom,
            handleInputID } = usePongContext()
    const token = localStorage.FBIdToken

    if(token) {
        return (
            <div className={styles.container}>
                <h1 className={styles.header}> How to play Pong </h1>
                <div className={styles.instructions}> 1) Control the paddle using your arrow keys </div>
                <div className={styles.instructions}> 2) First to 5 points wins the game </div>
                <div className={styles.instructions}> 3) You will get a point if the ball passes the boundary of your opponent </div>
                <button className={styles.createRoomButton} onClick={createRoom}> Create room </button>
                <br />
                <input className={styles.inputField} type="text" placeholder="Input room id" onChange={handleInputID}></input>
                <button className={styles.joinRoomButton} onClick={handleJoinRoom}> Join Room </button>
                <h1 className={styles.header}> Instructions </h1>
                <div className={styles.instructions}> 1) Click on create room </div>
                <div className={styles.instructions}> 2) Send the room id to your friend to join and wait </div>
                <div className={styles.instructions}> 3) Type the room id into the input field (For people joining with room id) </div>
                <div className={styles.instructions}> 4) Click on join room (For people joining with room id) </div>
                <div className={styles.instructions}> 5) If nothing happens when you click join room, the room is probably full (For people joining with room id) </div>
                <div className={styles.instructions}> 5) Enjoy! </div>
            </div>
        );
    } else {
        return <Redirect to="/Login" />
    }
}
 
export default PongGameLobby;