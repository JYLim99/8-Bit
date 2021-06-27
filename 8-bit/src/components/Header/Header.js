import { Link } from 'react-router-dom';
import SpaceInvaderIcon from '../../images/SpaceInvaderIcon.png';
import styles from './Header.module.css';
import MusicPlayer from '../MusicPlayer/MusicPlayer';

const Header = () => {
    return ( 
        <div className={ styles.Header }>
            <div className={ styles.container }>
                <div className={ styles.HeaderInner }>
                    <Link to="/" className={ styles.Name }> 
                        <img className={ styles.SpaceInvaderIcon } src={ SpaceInvaderIcon } alt="SpaceInvaderIcon"/>
                        8 Bit 
                    </Link>
                    <MusicPlayer />
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