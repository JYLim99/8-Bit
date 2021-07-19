import React, { useContext, useState, useRef } from 'react'
import { useHistory } from 'react-router'
import store from '../../redux/store'
import { db } from '../../config/firebase'

const PongContext = React.createContext()

export function usePongContext() {
    return useContext(PongContext)
}

export function PongProvider({ children }) {

    const [ roomID, setRoomID ] = useState("")
    let history = useHistory();
    const [ player, setPlayer ] = useState(0);
    let num = 0;
    let numRef = useRef(num)

    function getHandle() {
        const token = localStorage.FBIdToken
        if(token) {
            return store.getState().user.credentials.handle;
        } else {
            return console.log("Error in getting handle")
        }
    }

    async function createRoom() {
        let handle = getHandle();
        setPlayer(1)
        await db.collection("gamesRoom")
            .add({
                numPlayer: 1,
                player1Handle: handle,
                id: ""
            })
            .then((docRef) => {
                updateDoc(docRef.id)
            })
    }

    async function updateDoc(id) {
        await db.collection("gamesRoom")
            .doc(id)
            .update({
                id: id
            })
        setRoomID(id)
        history.push(`/PongGame/${id}`)
    }

    async function handleJoinRoom() {
        // await db.collection("gamesRoom")
        //     .doc(roomID)
        //     .onSnapshot((doc) => {
        //         numRef.current = doc.data().numPlayer
        //     })
        // if(numRef.current === 1) {
            let handle = getHandle();
            setPlayer(2);
            db.collection("gamesRoom")
                .doc(roomID)
                .update({
                    numPlayer: 2,
                    player2Handle: handle
                })
                .then(
                    history.push(`/PongGame/${roomID}`)
                )
        // } else {
        //     alert("Room is full")
        // } 
    }

    function handleInputID(event) {
        event.preventDefault()
        setRoomID(event.target.value)
    }
    
    const value = {
        handleJoinRoom,
        getHandle,
        createRoom,
        handleInputID,
        roomID,
        player
    }

    return (
        <PongContext.Provider value={value}>
          {children}
        </PongContext.Provider>
    )
}