import React, { useState } from 'react';
import styles from './Dashboard.module.css';
import { useAuth } from '../../components/Context/AuthContext';
import { db } from '../../config/firebase';
import { Link, Redirect } from 'react-router-dom';

const Dashboard = () => {

    const { currentUser } = useAuth();
    const [ imgData, setImgData ] = useState(null);
    const [ status, setStatus ] = useState('');

    if(currentUser) { 
        const docRef = db.collection('users').doc(`${currentUser.uid}`);
        docRef.get().then((doc) => {
            if(doc.exists) {
                setImgData(doc.data().imgUrl)
                setStatus(doc.data().status.status)
            } else {
                console.log("No document")
            }
        }).catch((error) => {
            console.log("Error: ", error)
        })
    }

    if(currentUser) {
        return (
            <div className={ styles.profileContainer }>
            <img className={ styles.profileImage } src={ imgData } />
            <br />
            <div className={ styles.info }> Display Name: { currentUser.displayName }</div>
            <br />
            <div className={ styles.info }> Status: { status } </div>
            <br />
            <div className={ styles.info }> Email: { currentUser.email } </div>
            <br />
            <Link className={ styles.redirect } to='/UpdateProfile'> Update Profile </Link>
            </div>
        )
    } else {
        return <Redirect to="/Login" />
    }
}
 
export default Dashboard;
