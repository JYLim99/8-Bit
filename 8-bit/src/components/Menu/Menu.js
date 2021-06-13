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
                            <Link className="link" to="/">
                                <div className="wrapper">
                                    <div className="lineLeft">
                                        <div className="mask"></div>
                                        <div className="title">
                                            <h2>
                                                <div className="text">
                                                    Home
                                                </div>
                                            </h2>
                                        </div>
                                        <div className="lineRight"></div>
                                    </div>
                                </div>
                            </Link>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Menu;