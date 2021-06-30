import React, { useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import { db, storage } from '../../config/firebase';
import { useHistory, Redirect } from 'react-router-dom';
import styles from './UpdateProfile.module.css';

const UpdateProfile = () => {

    const { currentUser } = useAuth();
    const [ displayName, setDisplayName ] = useState('');
    const [ status, setStatus ] = useState('');
    const [ image, setImage ] = useState('');
    const [ imgUrl, setImgUrl ] = useState(null);
    const history = useHistory();

    const handleDisplayName = (event) => {
        setDisplayName(event.target.value)
    }

    const handleStatus = (event) => {
        setStatus(event.target.value)
    }

    const handleImage = (event) => {
        if(event.target.files[0]) {
            setImage(event.target.files[0])
            setImgUrl(URL.createObjectURL(event.target.files[0]))
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        if(displayName !== '') {
            await currentUser.updateProfile({
                displayName: `${displayName}`
            })
        }
        if(status !== '') {
            await db.collection('users')
                .doc(currentUser.uid)
                .set({
                    status: { status }
                })
        }

        if(image !== '') {
            const uploadImage = storage.ref(`ProfilePictures/${currentUser.uid}/UserDisplayPic`).put(image)
            uploadImage.on(
                'state_changed', 
                (snapshot) => {},
                error => {
                    console.log(error)
                }, 
                () => {
                    storage
                        .ref('ProfilePictures')
                        .child(`${currentUser.uid}`)
                        .child('UserDisplayPic')
                        .getDownloadURL()
                        .then(url => {
                            db.collection('users')
                            .doc(currentUser.uid)
                            .update({
                                imgUrl: url
                            })
                        })
                        .then(() => {
                            history.push('/Dashboard')
                        })
                }
            )
        } else {
            history.push('/Dashboard')
        }
    }

    const handleReturn = () => {
        history.push('/Dashboard')
    }

    if(currentUser) {
        return (
            <div className={ styles.background }>
                <form className={ styles.profileContainer }>
                    <label className={ styles.label }> Change your display name: </label>
                    <input className={ styles.input } type="text" placeholder={ currentUser.displayName } onChange={ handleDisplayName } /> 
                    <br />
                    <label className={ styles.label }> Change your status: </label>
                    <input className={ styles.input } type="text" placeholder="Yes we can" onChange={ handleStatus } />
                    <br />
                    <img className={ styles.profileImg } src={ imgUrl } />
                    <label className={ styles.label }> Change your profile picture: </label>
                    <input className={ styles.input } type="file" onChange={ handleImage }/>
                    <br />
                    <button className={ styles.submitButton } onClick={ handleSubmit }> Submit </button>
                    <button className={ styles.dashboardButton } onClick={ handleReturn }> Return back to Dashboard </button>
                </form>
            </div>
        );
    } else {
        return <Redirect to="/Login" />
    }
}
 
export default UpdateProfile;