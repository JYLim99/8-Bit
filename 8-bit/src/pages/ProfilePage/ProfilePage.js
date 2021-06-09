import React, { useState } from 'react';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {

    const [ img, setImg ] = useState(null);
    const [ name, setName ] = useState("");
    const [ status, setStatus ] = useState("");
    const [ hasProfile, setHasProfile ] = useState(false);
    const [ favGame, setFavGame ] = useState("");

    const handleImage = (event) => {
        setImg(URL.createObjectURL(event.target.files[0]))
    }

    const handleName = (event) => {
        setName(event.target.value);
    }

    const handleStatus = (event) => {
        setStatus(event.target.value);
    }

    if(hasProfile === false) {
        return (
            <div className={ styles.profileContainer }> 
                <label>
                    <input type="file" onChange={ handleImage }/>
                </label>
                <br></br>
                <label className={ styles.name }> Name: </label>
                <input type="text" onChange={ handleName } placeholder="Bob" required/>
                <br></br>
                <label> Staus: </label>
                <input type="text" onChange={ handleStatus } placeholder="I am Bob the Builder" required />
                <button type="submit" onClick={()=> setHasProfile(true)}> Edit </button>
            </div>
        );
    } else {
        return(
            <div className={ styles.editedProfile }>
                <img className={styles.image} src={ img }></img>
                <div> Name: {name} </div>
                <div> Status: { status }</div>
                <div> Favourite game: { favGame } </div>
            </div>
        );
    }
}
 
export default ProfilePage;

