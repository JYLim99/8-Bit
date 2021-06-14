import { Link } from 'react-router-dom';
import SpaceInvaderIcon from '../../images/SpaceInvaderIcon.png';
import styles from './Header.module.css';

const Header = () => {
    return ( 
        <div className={ styles.Header }>
            <div className={ styles.container }>
                <div className={ styles.HeaderInner }>
                    <img className={ styles.SpaceInvaderIcon } src={ SpaceInvaderIcon } alt="SpaceInvaderIcon"/>
                    <Link to="/" className={ styles.Name }> 8 Bit </Link>
                    <Link to="/Menu">
                        <div className={ styles.nav }>
                            <span className={ styles.span }></span>
                            <span className={ styles.span }></span>
                        </div>
                    </Link>
                </div>
            </div>
         </div>
    );
}

export default Header;