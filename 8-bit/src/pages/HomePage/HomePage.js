import SpaceInvaders from "../../images/SpaceInvaders.jpeg"
import Pong from "../../images/Pong.jpeg"
import Breakout from "../../images/Breakout.png"
import styles from "./HomePage.module.css"
import { Link } from "react-router-dom"

const HomePage = () => {
  return (
    <div className={styles.Gameslist}>
      <Link to="/SpaceInvaders">
        <img className={styles.img} src={SpaceInvaders} alt="SpaceInvaders" />
        {/* <p> Space Invaders </p> */}
      </Link>
      <Link to="/Pong">
        <img className={styles.img} src={Pong} alt="Pong" />
        {/* <p> Pong </p> */}
      </Link>
      <Link to="/Breakout">
        <img className={styles.img} src={Breakout} alt="Breakout" />
        {/* <p> Breakout </p> */}
      </Link>
    </div>
  )
}

export default HomePage
