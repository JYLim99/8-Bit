import React, { useState } from 'react';
import styles from './Dashboard.module.css';
import { useAuth } from '../../components/Context/AuthContext';
import UpdateProfile from '../../components/UpdateProfile/UpdateProfile';
import { db } from '../../config/firebase';

const Dashboard = () => {

    const { currentUser } = useAuth();

    if(currentUser.photoUrl === undefined) {
        return (
           <UpdateProfile />
        )
     } else {
         return (
             <>
                 <br />
                 <div> { currentUser.displayName }</div>
                 <br />
                 <div> { currentUser.email } </div>
             </>
         )
     }
}
 
export default Dashboard;
