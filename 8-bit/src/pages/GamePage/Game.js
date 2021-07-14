import React from 'react';
import styles from './Game.module.css';
import SpaceInvaders from "../../images/SpaceInvaders.jpeg";
import Pong from "../../images/Pong.jpeg";
import Breakout from "../../images/Breakout.jpeg";
import { Link } from "react-router-dom";

const Game = () => {
    return (
        <div className={ styles.PageContainer }>
      <div className={ styles.SpaceInvaderContainer} >
          <div className={ styles.SpaceInvaderImgContainer}>
            <img
              className={ styles.SpaceInvaderImg }
              src={ SpaceInvaders }
              alt="SpaceInvaders"
            />
          </div>
          <div className={ styles.SpaceInvaderContent }>
            <div className={ styles.SpaceInvaderText }>
              Space Invaders is a 1978 shoot 'em up arcade game developed by
              Tomohiro Nishikado. The goal is to defeat wave after wave of
              descending aliens with a horizontally moving laser to earn as many
              points as possible.
            </div>
            <Link to="/SpaceInvaders">
            <button className={ styles.SpaceInvaderButton }> Play Now </button>
            </Link>
        </div>
      </div>
      <div className={ styles.PongContainer }>
         <div className={ styles.PongText }> 
            Pong is a table tennis–themed arcade sports video game, 
            featuring simple two-dimensional graphics, 
            manufactured by Atari and originally released in 1972. 
            The goal is to earn as many points as possible.
            Points are earned when one fails to return the ball to the other.
          </div>
          <img className={ styles.PongImg } src={Pong} alt="Pong" />
          <Link to="/Pong">
              <button className={ styles.PongButton }> Play Now </button>
          </Link>
          <Link to="/PongMultiplayer/GameLobby">
              <button className={ styles.PongMultiButton }> Play Multiplayer </button>
          </Link>
      </div>
      <div className={ styles.BreakoutContainer }>
          <img className={ styles.BreakoutImg } src={ Breakout } alt="Breakout" />
          <div className={ styles.BreakoutText }> 
            Breakout is an arcade game developed and published by Atari, Inc.,
            and released on May 13, 1976. In Breakout, a layer of bricks lines the top third 
            of the screen and the goal is to destroy them all by repeatedly bouncing 
            a ball off a paddle into them. 
          </div>
          <Link to="/Breakout">
            <button className={ styles.BreakoutButton }> Play Now </button>
          </Link>
      </div>
    </div>
    );
}
 
export default Game;