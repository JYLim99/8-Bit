import React, { useEffect, useRef } from 'react';
import Rectangle from './Rectangle';
import Circle from './Circle';
import Text from './Text';

const Pong = () => {

    const canvasRef = useRef(null);
      
    useEffect(() => {
        
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const user = {
          x: 0,
          y: canvas.height / 2 - 50,
          width: 10,
          height: 100,
          color: "WHITE",
          score : 0
        }

        const com = {
          x: canvas.width - 10,
          y: canvas.height/2 - 50,
          width: 10,
          height: 100,
          color: "WHITE",
          score: 0
        }

        const ball = {
          x: canvas.width / 2,
          y: canvas.height / 2,
          radius: 10,
          speed: 5,
          velocityX: 5,
          velocityY: 5
        }

        function render() {
          Rectangle(context, 0, 0, canvas.width, canvas.height, "BLACK");
          Text(context, user.score, canvas.width/4, canvas.height/5, "WHITE");
          Text(context, com.score, 3*canvas.width/4, canvas.height/5, "WHITE");
          Rectangle(context, user.x, user.y, user.width, user.height, user.color);
          Rectangle(context, com.x, com.y, com.width, com.height, com.color);
          Circle(context, ball.x, ball.y, ball.radius, ball.color)
        }
        render();
        function game() {
          render();
        }
        const framePerSecond = 50;
        setInterval(game, 1000/framePerSecond);
      }, [])

    return (
        <canvas width="600" height="400" ref={ canvasRef } />
    )
}
 
export default Pong;