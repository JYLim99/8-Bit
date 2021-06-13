import { Link, useHistory } from 'react-router-dom';
import SpaceInvaderIcon from '../../images/SpaceInvaderIcon.png';
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
            <div className={ styles.Header }>
                <img className={ styles.SpaceInvaderIcon } src={ SpaceInvaderIcon } alt="SpaceInvaderIcon"/>
                <Link to="/" className={ styles.Name }> 8 Bit </Link>
                <nav className={ styles.LinkContainer }>
                    <Link to="/" className={ styles.HomeLink }> Home </Link>
                    <Link to="/Forum" className={ styles.ForumLink }> Forum </Link>
                    <Link to="/Login" className={ styles.LoginLink }> Login </Link>
                </nav>
            </div>
        );
    } else {
        return ( 
            <div className={ styles.Header }>
                <img className={ styles.SpaceInvaderIcon } src={ SpaceInvaderIcon } alt="SpaceInvaderIcon"/>
                <Link to="/" className={ styles.Name }> 8 Bit </Link>
                <nav className={ styles.LinkContainer }>
                    <Link to="/" className={ styles.HomeLink }> Home </Link>
                    <Link to="/Forum" className={ styles.ForumLink }> Forum </Link>
                    <Link to="/ProfilePage" className={ styles.ProfileLink }> Profile </Link>
                    <button className={ styles.Button } onClick= { handleLogout }> Logout </button>
                </nav>
            </div>
        );
    }
}

export default Header;