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

let lives = 5

const Pong = () => {
  const canvasRef = useRef(null)
  const [gameOver, setGameOver] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const ballRef = useRef(ball)
  const userRef = useRef(user)
  const comRef = useRef(com)
  const requestRef = useRef()

  useLayoutEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

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

      userRef.current.y =
        event.clientY - rect.top - userRef.current.paddleHeight / 2
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
        comRef.current.computerLevel += 0.005
      }

      if (lives === 0) {
        setGameOver(true)
        const token = localStorage.FBIdToken
        if (token) {
          let handle = store.getState().user.credentials.handle
          addScoreToDatabase(handle, user.score)
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

        ballRef.current.speed += 0.08
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

  const Instructions = () => {
    return (
      <div className={styles.instructsBody}>
        <ui>
          <ul> Press anywhere to play </ul>
          <br />
          <ul> Move your mouse up and down to move </ul>
          <br />
          <ul> Click on the screen again to pause </ul>
          <br />
          <ul> You have 5 tries before you lose</ul>
        </ui>
      </div>
    )
  }

  const Header = () => {
    return <h3 className={styles.Header}> Pong </h3>
  }
  const [instructDisplay, setInstructDisplay] = useState(true)
  const [headerDisplay, setHeaderDisplay] = useState(true)

  if (!gameOver) {
    return (
      <>
        {headerDisplay ? <Header /> : null}
        <canvas
          ref={canvasRef}
          height={height}
          width={width}
          className={styles.canvasContainer}
          onClick={() => {
            setGameStarted(!gameStarted)
            setInstructDisplay(false)
            setHeaderDisplay(false)
          }}
        />
        {instructDisplay ? <Instructions /> : null}
      </>
    )
  } else {
    return (
      <>
        <h1 className={styles.gameOverHeader}>
          {' '}
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
