import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
    return ( 
        <nav className= {styles.Header}>
            <h1>8 Bit</h1>
            <div className= {styles.links}>
                <input types="text" placeholder="Search games"></input>
                <Link to="/">Home</Link>
                <Link to="/LoginPage">Login</Link>
            </div>
        </nav>
     );
}

export default Header;