import React, { useLayoutEffect, useRef, useState } from 'react';
import styles from './PongMultiplayer.module.css';
import { usePongContext } from './PongContext';
import { db } from '../../config/firebase';

const PongMultiplayer = () => {

    const { roomID } = usePongContext();
    const height = 600;
    const width = 900;
    const canvasRef = useRef(null)
    const [ gameOver, setGameOver ] = useState(false)
    const [ twoPlayers, setTwoPlayers ] = useState(false)

    const ball = {
        x: width/2,
        y: height/2,
        dx: 5,
        dy: 5,
        speed: 7,
        radius: 10
    }

    const paddle1 = {
        x: 0,
        y: height / 2 - 50,
        paddleWidth: 10,
        paddleHeight: 100,
        score: 0
    }

    function checkTwoPlayers() {
        db.collection("gamesRoom")
            .doc(roomID)
            .onSnapshot((doc) => {
                if(doc.data().numPlayer === 2) {
                    setTwoPlayers(true)
                }
            })
        console.log(twoPlayers)
        return twoPlayers
    }

    function initBall() {
        db.collection("gamesRoom")
            .doc(roomID)
            .update({
                ballX: width/2,
                ballY: height/2,
                balldx: 5,
                balldy: 5,
                ballSpeed: 7 
            })
    }
    
    function getBallUpdate() {
        db.collection("gamesRoom")
            .doc(roomID)
            .onSnapshot((doc) => {
                ball.x = doc.data().ballX
                ball.y = doc.data().ballY
                ball.dx = doc.data().balldx
                ball.dy = doc.data().balldy
                ball.speed = doc.data().ballSpeed
            })
    }

    function sendBallData(x, y, dx, dy, speed) {
        db.collection("gamesRoom")
            .doc(roomID)
            .update({
                ballX: x,
                ballY: y,
                balldx: dx,
                balldy: dy,
                ballSpeed: speed
            })
    }

    function initPaddle1() {
        db.collection("gamesRoom")
            .doc(roomID)
            .update({
                paddle1X: paddle1.x,
                paddle1Y: paddle1.y,
                paddle1Score: paddle1.score
        })
    }

    function getPaddle1Data() {
        
    }

    function sendPaddle1Data(x, y, score) {
        db.collection("gamesRoom")
            .doc(roomID)
            .update({
                paddle1X: x,
                paddle1Y: y,
                paddle1Score: score
        })

    }

    useLayoutEffect(() => {

        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')

        function drawArc(x, y, r, color){
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(x,y,r,0,Math.PI*2,true);
            ctx.closePath();
            ctx.fill();
        }

        function render() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawArc(ball.x, ball.y, ball.radius, "WHITE")
        }

        if(checkTwoPlayers()) {
            initBall()
        }

        function update() {

            getBallUpdate();

            ball.x = ball.x + ball.dx;
            ball.y = ball.y + ball.dy;

            sendBallData(ball.x, ball.y, ball.dx, ball.dy, ball.speed)

            if (
                ball.y + ball.dy < ball.radius ||
                ball.y + ball.dy > height - ball.radius
            ) {
                ball.dy = -ball.dy
            }

        }

        function game() {
            update()
            render()
            requestAnimationFrame(game)
        }

        if(checkTwoPlayers()) {
            requestAnimationFrame(game)
        }

    }, [])


    return (
        <>
            <canvas
                ref={canvasRef}
                className={styles.CanvasContainer}
                width={width}
                height={height}>
            </canvas>
        </>
    );
}
 
export default PongMultiplayer 