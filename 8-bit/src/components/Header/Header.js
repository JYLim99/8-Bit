import { Link, useHistory } from 'react-router-dom';
import styles from './Header.module.css';
import { useAuth } from '../Context/AuthContext';

const Header = () => {

    const { currentUser, logout } = useAuth();
    const history = useHistory();

    function handleLogout() {
        logout();
        history.push('/Login');
    }
    
    if (!currentUser) {
        return ( 
            <nav className= {styles.Header}>
                <h1>8 Bit</h1>
                <div className= {styles.links}>
                    <ul>
                        <Link to="/"> Home </Link>
                        <Link to="/Login"> Login </Link>
                    </ul>
                </div>
            </nav>
        );
    } else {
        return ( 
            <nav className= {styles.Header}>
                <h1>8 Bit</h1>
                <div className= {styles.links}>
                    <ul>
                        <Link to="/"> Home </Link>
                        <button onClick= { handleLogout }> Logout </button>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Header;