import React from 'react';
import styles from './Menu.module.css';
import { Link } from 'react-router-dom';

const Menu = () => {
    return (
        <div className={ styles.navigation }>
            <div className={ styles.menuTitle }> Navigation </div>
            <div className={ styles.close }> Close </div>
            <div className={ styles.menu }>
                <div className={ styles.container }>
                    <div className={ styles.menuInner }>
                        <ul className={ styles.list }>
                            <li className={ styles.li }>
                                <Link to="/" className={ styles.link } >
                                    <div className={ styles.wrapper }>
                                        <div className="lineLeft">
                                            {/* <div className="mask"></div> */}
                                        </div>
                                        <div className={ styles.title }>
                                            <h2 className={ styles.header }>
                                                <div className={ styles.text }> Home </div>
                                            </h2>
                                        </div>
                                        <div className="lineRight"></div>
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Menu;