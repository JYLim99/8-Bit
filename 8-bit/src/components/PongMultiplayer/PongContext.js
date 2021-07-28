import React, { useContext, useState } from 'react'
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

    // Returns the handle of the user
    function getHandle() {
        const token = localStorage.FBIdToken
        if(token) {
            return store.getState().user.credentials.handle;
        } else {
            return console.log("Error in getting handle")
        }
    }

    // Sets the players number and update firestore
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

    // Update firestore with room id and redirect user to game room
    async function updateDoc(id) {
        await db.collection("gamesRoom")
            .doc(id)
            .update({
                id: id
            })
        setRoomID(id)
        history.push(`/PongGame/${id}`)
    }

    // Sets player number, update firestore and redirect user if room is not full
    async function handleJoinRoom() {
        db.collection("gamesRoom")
            .doc(roomID)
            .get()
            .then((doc) => {
                console.log(doc.data().numPlayer)
                if(doc.data().numPlayer === 1) {
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

                } else {
                    alert("Room is full")

                }
            })
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