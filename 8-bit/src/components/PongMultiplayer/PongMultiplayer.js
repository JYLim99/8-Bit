import React, { useLayoutEffect, useRef, useState } from 'react';
import styles from './PongMultiplayer.module.css';


const PongMultiplayer = () => {

    const height = 600;
    const width = 900;
    const canvasRef = useRef(null)
    const [ gameOver, setGameOver ] = useState(false)
    

    useLayoutEffect(() => {

        const canvas = canvasRef.current
        const context = canvas.getContext('2d')

    })
    return (
        <>
            <canvas
                className={styles.CanvasContainer}
                width={width}
                height={height}>
            </canvas>
        </>
    );
}
 
export default PongMultiplayer 