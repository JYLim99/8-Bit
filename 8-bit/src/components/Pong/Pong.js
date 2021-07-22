import React, { useRef, useLayoutEffect, useState } from 'react'
import { ball, drawBall } from './Ball'
import { user, drawUser } from './UserPaddle'
import { com, drawCom } from './ComPaddle'
import { Dimensions } from './Dimensions'
import styles from './Pong.module.css'

import { db } from '../../config/firebase'
import store from '../../redux/store'

async function addScoreToDatabase(handle, newScore) {
  let dbScore = await db
    .collection('pongScores')
    .doc(handle)
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log('Document data:', doc.data())
        console.log(doc.data().score)
        return doc.data().score
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!')
        return undefined
      }
    })
    .catch((error) => {
      console.log('Error getting document:', error)
    })
  console.log(dbScore)
  if (parseInt(newScore) > dbScore || dbScore === undefined) {
    db.collection('pongScores')
      .doc(handle)
      .set({
        name: handle,
        score: newScore,
      })
      .then(function () {
        console.log(newScore)
        console.log('Value successfully written!')
      })
      .catch(function (error) {
        console.error('Error writing Value: ', error)
      })
  }
}

async function addScoreToUser(handle, newScore) {
  let dbUserScore = await db
    .collection('users')
    .doc(handle)
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log('Document data:', doc.data())
        console.log(doc.data().pong)
        return doc.data().pong
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!')
        return undefined
      }
    })
    .catch((error) => {
      console.log('Error getting document:', error)
    })
  console.log(dbUserScore)
  if (parseInt(newScore) > dbUserScore || dbUserScore === undefined) {
    db.collection('users')
      .doc(handle)
      .set(
        {
          pong: parseInt(newScore),
        },
        { merge: true }
      )
      .then(function () {
        console.log(newScore)
        console.log('Value successfully written!')
      })
      .catch(function (error) {
        console.error('Error writing Value: ', error)
      })
  }
}

const { height, width } = Dimensions

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val))
}

function collision(ball, rect) {
  let cX = clamp(ball.x, rect.x, rect.x + rect.paddleWidth)
  let cY = clamp(ball.y, rect.y, rect.y + rect.paddleHeight)

  let distX = ball.x - cX
  let distY = ball.y - cY

  let dist = distX * distX + distY * distY

  return dist < ball.radius * ball.radius
}

function drawText(context, text, x, y) {
  context.fillStyle = 'WHITE'
  context.font = '15px pixel'
  context.fillText(text, x, y)
}

function drawInitialText(context, text, x, y, style) {
  context.fillStyle = 'WHITE'
  context.font = style
  context.fillText(text, x, y)
}

let lives = 5

const Pong = () => {
  const canvasRef = useRef(null)
  const [gameOver, setGameOver] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const ballRef = useRef(ball)
  const userRef = useRef(user)
  const comRef = useRef(com)
  const requestRef = useRef()
  const [anotherFlag, setAnotherFlag] = useState(true)

  useLayoutEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    context.textBaseline = 'middle'
    context.textAlign = 'center'; 

    if(!gameStarted && anotherFlag) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      drawInitialText(context, "Pong", width / 2, height / 4, "80px pixel")
      drawInitialText(context, "Press anywhere to play", width / 2, height / 2.5, "20px pixel")
      drawInitialText(context, "Move your mouse up and down to move", width / 2, height / 2, "20px pixel")
      drawInitialText(context, "Click on the screen again to pause", width/2, height / 1.65, "20px pixel")
      drawInitialText(context, "You are the left paddle (yellow color)", width/2, height / 1.4, "20px pixel")
      drawInitialText(context, "You will score a point if the ball goes pass the computer boundary", width/2, height/ 1.23, "20px pixel")
      drawInitialText(context, "You have 5 tries before you lose", width/2, height / 1.1, "20px pixel")
    }

    function render() {
      drawBall(context, canvas)
      drawUser(context)
      drawCom(context)
      drawText(context, 'SCORE: ', width / 15, height / 10)
      drawText(context, user.score, width / 5, height / 10)
      drawText(context, 'TRIES REMAINING: ', width / 1.65, height / 10)
      drawText(context, lives, width / 1.125, height / 10)
    }

    canvas.addEventListener('mousemove', movePaddle)

    function movePaddle(event) {
      let rect = canvas.getBoundingClientRect()

        userRef.current.y = event.clientY - rect.top - userRef.current.paddleHeight / 2
    }

    function update() {
      if (ballRef.current.x - ballRef.current.radius < 0) {
        lives--
        ballRef.current.x = width / 2
        ballRef.current.y = height / 2
        ballRef.current.dx = -5
        ballRef.current.speed = 7
      } else if (ballRef.current.x + ballRef.current.radius > width) {
        userRef.current.score++
        ballRef.current.x = width / 2
        ballRef.current.y = height / 2
        ballRef.current.dx = -5
        ballRef.current.speed = 7
        comRef.current.computerLevel += 0.015
      }

      if (lives === 0) {
        setGameOver(true)
        const token = localStorage.FBIdToken
        if (token) {
          let handle = store.getState().user.credentials.handle
          addScoreToDatabase(handle, user.score)
          addScoreToUser(handle, user.score)
        }
      }

      ballRef.current.x += ballRef.current.dx
      ballRef.current.y += ballRef.current.dy

      comRef.current.y +=
        (ballRef.current.y -
          (comRef.current.y + comRef.current.paddleHeight / 2)) *
        comRef.current.computerLevel

      if (
        ballRef.current.y + ballRef.current.dy < ballRef.current.radius ||
        ballRef.current.y + ballRef.current.dy > height - ballRef.current.radius
      ) {
        ballRef.current.dy = -ballRef.current.dy
      }

      let player =
        ballRef.current.x + ballRef.current.radius < width / 2
          ? userRef.current
          : comRef.current

      if (collision(ballRef.current, player)) {
        let contact = ballRef.current.y - (player.y + player.paddleHeight / 2)

        contact = contact / (player.paddleHeight / 2)

        let angleRad = contact * (Math.PI / 4)

        let direction =
          ballRef.current.x + ballRef.current.radius < width / 2 ? 1 : -1

        ballRef.current.dx =
          direction * ballRef.current.speed * Math.cos(angleRad)

        ballRef.current.dy = ballRef.current.speed * Math.sin(angleRad)

        ballRef.current.speed += 0.1
      }
    }

    function game() {
      update()
      render()
      requestRef.current = requestAnimationFrame(game)
    }

    if (gameStarted) {
      requestRef.current = requestAnimationFrame(game)
    }

    return () => cancelAnimationFrame(requestRef.current)
  }, [gameStarted])


  if (!gameOver) {
    return (
      <>
        <canvas
          rel="preload" as="font"
          crossorigin="anonymous"
          ref={canvasRef}
          height={height}
          width={width}
          className={styles.canvasContainer}
          onClick={() => {
            setGameStarted(!gameStarted)
            setAnotherFlag(false)
          }}
        />
      </>
    )
  } else {
    return (
      <>
        <h1 className={styles.gameOverHeader}>
          GAME OVER! Your score: {user.score}
        </h1>
        <button
          className={styles.restartButton}
          onClick={() => {
            setGameOver(false)
            window.location.reload()
          }}
        >
          Restart
        </button>
      </>
    )
  }
}

export default Pong
