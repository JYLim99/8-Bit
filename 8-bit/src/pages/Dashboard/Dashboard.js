import React, { useState } from 'react';
import styles from './Dashboard.module.css';
import { useAuth } from '../../components/Context/AuthContext';
import UpdateProfile from '../../components/UpdateProfile/UpdateProfile';
import { db } from '../../config/firebase';
import { Link } from 'react-router-dom';

const Dashboard = () => {

    const { currentUser } = useAuth();
    const [ imgData, setImgData ] = useState(null);
    const [ status, setStatus ] = useState('');

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


    if(currentUser.photoUrl) {
        return (
           <UpdateProfile />
        )
     } else {
         return (
             <>
                <img src={ imgData } />
                { status }
                 <br />
                 <div> { currentUser.displayName }</div>
                 <br />
                 <div> { currentUser.email } </div>
                 <Link to='/UpdateProfile'> Update Profile </Link>
             </>
         )
     }
}
 
export default Dashboard;
