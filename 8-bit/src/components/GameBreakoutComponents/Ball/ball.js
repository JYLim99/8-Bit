/* eslint-disable import/no-anonymous-default-export */
import React from "react"
import styles from "./ball.module.css"

//x and y is center of the ball
export default ({ x, y, radius }) => (
  <circle className={styles.ball} cx={x} cy={y} r={radius} />
)
