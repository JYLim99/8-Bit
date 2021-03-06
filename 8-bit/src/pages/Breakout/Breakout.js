/* eslint-disable import/no-anonymous-default-export */
import React, { useRef, useEffect, useState } from 'react'
import styles from './Breakout.module.css'

import Scene from '../../components/GameBreakoutComponents/Scene/scene'
import { registerListener } from '../../components/GameBreakoutComponents/utils'

const Breakout = () => {
  const sceneContainer = useRef()
  const [size, setSize] = useState()

  const AlwaysScrollToBottom = () => {
    const elementRef = useRef()
    useEffect(() => elementRef.current.scrollIntoView())
    return <div ref={elementRef} />
  }

  useEffect(() => {
    const onResize = () => {
      const { width, height } = sceneContainer.current.getBoundingClientRect()
      setSize({ width, height })
    }
    const unregisterResizeListener = registerListener('resize', onResize)
    onResize()
    return unregisterResizeListener
  }, [])

  return (
    <div className={styles.page}>
      <div className={styles.instructions}>
        <text>
          <h3> Instructions </h3>
          <ui>
            <li> Spacebar to start/pause </li>
            <br />
            <li> [←][→] to move </li>
            <br />
            <li>
              Lives are represented
              <br />
              <br />
              &nbsp;by rectangles on the
              <br />
              <br />
              &nbsp;top right corner
            </li>
          </ui>
        </text>
      </div>
      Score: <span id='current-score'></span>
      <div className={styles.sceneContainer} ref={sceneContainer}>
        {size && <Scene width={size.width} height={size.height} />}
      </div>
      <AlwaysScrollToBottom />
    </div>
  )
}

export default Breakout
