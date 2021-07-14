import React, { useEffect } from 'react'
import { usePongContext } from '../PongMultiplayer/PongContext'

const PongGameLobby = () => {

    const { handleJoinRoom, 
            getWaitingRooms, 
            createRoom,
            rooms,
            handleInputID } = usePongContext()

    useEffect(() => {
        getWaitingRooms()
    }, [])

    return (
        <>
            { rooms && rooms.map(rooms => {
                    return (
                        <div> 
                            {rooms.id} {" "}
                            {rooms.player1Handle} 
                        </div>
                    )
                }) }
            <input type="text" placeholder="Input room id" onChange={handleInputID}></input>
            <button onClick={handleJoinRoom}> Join Room </button>
            <br />
            <button onClick={createRoom}> Create room </button>
        </>
    );
}
 
export default PongGameLobby;