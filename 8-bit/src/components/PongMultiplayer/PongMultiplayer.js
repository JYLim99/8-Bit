import React, { useState, useRef, useLayoutEffect } from 'react';
import io from 'socket.io-client';
import styles from './PongMultiplayer.module.css';

const PongMultiplayer = () => {

    const canvasRef = useRef(null)
    const [ gameOver, setGameOver ] = useState(false)
    const requestRef = useRef();


    useLayoutEffect(() => {

        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")
        const socket = io();
        const height = 400;
        const width = 600;
        
        class Ball {

            constructor(x, y, dx, dy, speed){
                this.x = x;
                this.y = y;
                this.dx = dx;
                this.dy = dy;
                this.speed = speed
                this.radius = 10;
                this.room = -1
            }
        
            setRoom(num) {
                this.room = num
            }
        
            changePosition(x, y, dx, dy) {
                this.x = x;
                this.y = y;
                this.dx = dx;
                this.dy = dy;
            }
        
            changeSpeed(speed) {
                this.speed = speed;
            }
        }

        class Paddle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.width = 10;
                this.height = 100;
                this.score = 0;
                this.no = -1;
                this.color = ''
                this.room = -1;
            }
        
            setColor(color) {
                this.color = color
            }
        
            increaseScore() {
                this.score++
            }
        
            setNo(no) {
                this.no = no
            }
        
            setPosition(y) {
                this.y = y;
            }

            setRoom(num) {
                this.room = num
            }

            setID(id) {
                this.id = id
            }

            resetScore() {
                this.score = 0
            }
        }

        function drawArc(x, y, r, color){
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(x,y,r,0,Math.PI*2,true);
            ctx.closePath();
            ctx.fill();
        }

        function drawRect(x, y, w, h, color){
            ctx.fillStyle = color;
            ctx.fillRect(x, y, w, h);
        }

        function drawText(text,x,y){
            ctx.fillStyle = "#FFF";
            ctx.font = "15px fantasy";
            ctx.fillText(text, x, y);
        }

        canvas.addEventListener("mousemove", movePaddle)

        function movePaddle(event) {

            let rect = canvas.getBoundingClientRect()

            let data = event.clientY - rect.top - 50
            
            socket.emit('positionUpdate', data, selfID)

        }


        let football;
        let clientPads = {};
        let selfID;
        let numPlayer = 0;
        let wait = false


        socket.on('connect', () => {
        selfID = socket.id;
        })

        socket.on('updateConnections', player => {
            numPlayer++;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
                if(clientPads[player.id] === undefined){
                    clientPads[player.id] = new Paddle(player.x, player.y)
                    clientPads[player.id].setColor(player.color)
                    clientPads[player.id].setNo(player.no)
                    clientPads[player.id].setRoom(player.room)
                    clientPads[player.id].setID(player.id)
                }
        })


        socket.on('deletePlayer', player => {
        if(clientPads[player.id]){
            delete clientPads[player.id];
            football = null;
        }
    })

        socket.on('updateFootball', ball => {
            if(football === undefined){
                football = new Ball(width/2, height/2, 5, 5, 7)
            } else {
                football.changePosition(ball.x, ball.y, ball.dx, ball.dy)
            }
        })


        socket.on('updatePosition', (playerPads, id) => {
            if(clientPads[id] !== undefined){
                clientPads[id].setPosition(playerPads[id].y);
            }
        })


        socket.on('updateScore', scorerId => {
        if (scorerId === null){
            for (let id in clientPads){
                clientPads[id].score = 0;
            } 
        } else {
            for (let id in clientPads){
                if (id === scorerId){
                    if(clientPads[id].no === 1){
                        clientPads[id].score++;
                    } else if(clientPads[id].no === 2){
                        clientPads[id].score++;
                    }
                }
            }
        }
        })

        socket.on('updateBall', ball => {
            console.log(ball)
            football.changePosition(ball.x, ball.y, ball.dx, ball.dy)
            football.changeSpeed(ball.speed)
        })

        socket.on('waitingPlayer', waiting => {
            if(waiting) {
                wait = true
            }
        })

        function render() {
            ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

            if(wait) {
                drawText("Waiting for another player", width/2, height/2)
            }

            if(numPlayer === 2) {
                drawArc(football.x, football.y, football.radius, "WHITE")
            }
            for(let id in clientPads) {
                if(clientPads[id] !== undefined) {
                    drawRect(clientPads[id].x, clientPads[id].y, clientPads[id].width, clientPads[id].height, clientPads[id].color)
                    if(clientPads[id].no === 1) {
                        drawText(clientPads[id].score,canvas.width/4,canvas.height/5);
                    } else {
                        drawText(clientPads[id].score,3*canvas.width/4,canvas.height/5);
                    }
                }
            }
            requestRef.current = requestAnimationFrame(render)
        }

        socket.on('updateGameover', gameEnd => {
            if(gameEnd) {
                setGameOver(true)
            }
        })

        requestRef.current = requestAnimationFrame(render)


        if(gameOver) {
            return () => cancelAnimationFrame(requestRef)
        }

    }, [gameOver])

    console.log("HELLO WORLD")

    return (
        <div className={styles.PongContainer}>
            <canvas 
                className={styles.CanvasContainer }
                ref={ canvasRef } 
                height="400px" 
                width="600px" 
            ></canvas>
        </div>
    );
}
 
export default PongMultiplayer;