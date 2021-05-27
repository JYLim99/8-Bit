import React, { useEffect, useRef } from 'react';

const Canvas = () => {

    const canvasRef = useRef(null);
      
    useEffect(() => {
        
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        const createCanvas = (context) => {
            context.fillStyle = 'black';
            context.fillRect(100, 200, 50, 75);
            context.fillStyle = 'red';
            context.arc(50, 100, 20, 0, 2*Math.PI, false);
            context.fill();
          }
        createCanvas(context);
      }, [])

    return (
        <canvas width="600" height="400" ref={ canvasRef } />
    )
}
 
export default Canvas;