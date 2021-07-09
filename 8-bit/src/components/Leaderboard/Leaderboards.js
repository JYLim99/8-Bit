import React, { Component } from 'react'
import Breakout from './Breakout'
import Pong from './Pong'
import SpaceInvaders from './SpaceInvaders'
import styles from './Leaderboards.module.css'

class Leaderboards extends Component {
  render() {
    return (
      <div className={styles.page}>
        <Breakout />
        <Pong />
        <SpaceInvaders />
      </div>
    )
  }
}

export default Leaderboards
