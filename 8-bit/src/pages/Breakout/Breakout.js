/* eslint-disable import/no-anonymous-default-export */
import React, { useRef, useEffect, useState } from "react"
import styles from "./Breakout.module.css"

import Scene from "../../components/GameBreakoutComponents/Scene/scene"
import { registerListener } from "../../components/GameBreakoutComponents/utils"

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
    const unregisterResizeListener = registerListener("resize", onResize)
    onResize()
    return unregisterResizeListener
  }, [])

  return (
    <div className={styles.page}>
      <div className={styles.instructions}>
        <text>
          <h3> Instructions </h3>
          <ui>
            <li> Press Spacebar to start/pass </li>
            <li> Left and right arrow keys to move </li>
          </ui>
        </text>
      </div>
      <div>
        <p>
          Score: <span id="current-score"></span>
        </p>
      </div>
      <h1 className={styles.factsTitle}>
        <strong>Do you know?</strong>
      </h1>
      <div className={styles.facts}>
        <p>
          Breakout is an arcade game developed and published by Atari, Inc., and
          released on May 13, 1976. It was conceptualized by Nolan Bushnell and
          Steve Bristow, influenced by the seminal 1972 Atari arcade game Pong.
        </p>
      </div>
      <div className={styles.sceneContainer} ref={sceneContainer}>
        {size && <Scene width={size.width} height={size.height} />}
      </div>
      <AlwaysScrollToBottom />
    </div>
  )
}

export default Breakout
