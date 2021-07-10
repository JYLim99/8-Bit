import { db } from '../../config/firebase'
import store from '../../redux/store'
import { Redirect, Link } from 'react-router-dom';

const PongGameLobby = () => {

    let id;
    let handle;
    const token = localStorage.FBIdToken

    function reroute() {
        if(id !== undefined) {
            return <Link to={`/PongMultiplayer/GameLobby/${id}`}></Link>
        } else {
            console.log("Error occurred while re-routing`")
        }
    }

    function getHandle() {
        if(token) {
            handle = store.getState().user.credentials.handle;
        } else {
            return <Redirect to="/Login" />
        }
    }

    function createRoom() {

        const room = db.collection("gamesRoom")
            .add({
                player1: true,
                player1Handle: handle
            })
        id = room.id
    }

    return (
        <>
            <div></div>
            <button> Create room </button>
            <button> Join room</button>
        </>
    );
}
 
export default PongGameLobby;