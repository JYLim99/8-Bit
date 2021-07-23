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
    const {
      authenticated,
      user: {
        credentials: { handle },
      },
    } = this.props
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
              {authenticated ? (
                <div className={styles.helperText}>Welcome back, {handle}!</div>
              ) : (
                <div className={styles.helperText}>
                  <Link to='/Login'>Login</Link> to enjoy more features
                </div>
              )}
            </div>
            {authenticated ? (
              <Fragment>
                <Notifications />
              </Fragment>
            ) : (
              <div className={styles.placeHolder}></div>
            )}
            <MusicPlayer />
            <Link to='/Menu'>
              <div className={styles.nav}>
                <span className={styles.span}>Menu</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

Header.propTypes = {
  user: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  user: state.user,
  authenticated: state.user.authenticated,
})

export default connect(mapStateToProps)(Header)
