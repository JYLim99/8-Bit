import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import SpaceInvaderIcon from '../../images/SpaceInvaderIcon.png'
import styles from './Header.module.css'
import MusicPlayer from '../MusicPlayer/MusicPlayer'
import Notifications from './Notifications'

class Header extends Component {
  render() {
    const { authenticated } = this.props
    return (
      <div className={styles.Header}>
        <div className={styles.container}>
          <div className={styles.HeaderInner}>
            <div className={styles.LinkWrapper}>
              <Link to='/' className={styles.Link}>
                <img
                  className={styles.SpaceInvaderIcon}
                  src={SpaceInvaderIcon}
                  alt='SpaceInvaderIcon'
                />
                8 Bit
              </Link>
            </div>
            {authenticated ? (
              <Fragment>
                <Notifications />
              </Fragment>
            ) : (
              <Fragment></Fragment>
            )}
            <MusicPlayer />
            <Link to='/Menu'>
              <div className={styles.nav}>
                <span className={styles.span}></span>
                <span className={styles.span}></span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

Header.propTypes = {
  authenticated: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
})

export default connect(mapStateToProps)(Header)
