/* eslint-disable import/no-anonymous-default-export */

import React from "react"

import styles from "./paddle.module.css"

//x and y are left top corner of the paddle
export default ({ x, y, width, height }) => (
  <rect className={styles.paddle} x={x} y={y} width={width} height={height} />
)
