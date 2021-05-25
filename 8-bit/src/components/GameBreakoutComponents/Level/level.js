/* eslint-disable import/no-anonymous-default-export */
import React from "react"

import styles from "./level.module.css"

//Level display on the top left corner
export default ({ level, unit }) => (
  <text x={unit} y={unit * 2} fontSize={unit} className={styles.level}>
    LEVEL: {level}
  </text>
)
