/* eslint-disable import/no-anonymous-default-export */
import React from 'react'
import { getRange } from '../utils'
import styles from './block.module.css'
import { BLOCK_MAX_DENSITY } from '../levels'

//Density determines the opacity of the block color
const colors = getRange(BLOCK_MAX_DENSITY).map(
  (i) => `rgba(125, 249, 255, ${1 / (BLOCK_MAX_DENSITY - i)})`
)

//Creating the component itself
export default ({ x, y, width, height, density }) => (
  <rect
    className={styles.block}
    fill={colors[density]}
    x={x}
    y={y}
    width={width}
    height={height}
  />
)
