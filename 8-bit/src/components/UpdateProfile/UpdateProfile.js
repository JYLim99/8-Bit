import React, { useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import { db, storage } from '../../config/firebase';

const UpdateProfile = () => {

    const { currentUser } = useAuth();
    const [ displayName, setDisplayName ] = useState("");
    const [ status, setStatus ] = useState("");

    const handleDisplayName = (event) => {
        setDisplayName(event.target.value)
    }

    const handleStatus = (event) => {
        setStatus(event.target.value)
    }

    async function handleSubmit() {
        await currentUser.updateProfile({
            displayName: `${displayName}`
        })
        await db.collection('users')
            .doc(currentUser.uid)
            .set({
                status: { status }
            })
        window.location.reload();
    }

    return (
        <div className="profileContainer">
            <input className="name" type="text" placeholder="Display Name" onChange={ handleDisplayName } required/> 
            <br />
            <input type="text" placeholder="Status" onChange={ handleStatus } required/>
            <br />
            <button onClick={ handleSubmit }> Submit </button>
    </div>
    );
}
 
export default UpdateProfile;