/* eslint-disable import/no-anonymous-default-export */
import React from "react"

import styles from "./lives.module.css"

import { getRange } from "../utils"

//Lives display on the top right corner
const lives = ({ lives, containerWidth, unit }) => {
  const width = unit * 2
  return getRange(lives).map((i) => (
    <rect
      className={styles.life}
      rx={unit / 4}
      height={unit}
      width={width}
      y={unit}
      x={containerWidth - unit - width * (i + 1) - (unit / 2) * i}
      key={i}
    />
  ))
}

export default lives
