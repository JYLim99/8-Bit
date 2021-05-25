import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
    return ( 
        <nav className= {styles.Header}>
            <h1>8 Bit</h1>
            <div className= {styles.links}>
                <ul>
                    <Link to="/">Home</Link>
                    <Link to="/Login">Login</Link>
                </ul>
            </div>
        </nav>
     );
}

export default Header;