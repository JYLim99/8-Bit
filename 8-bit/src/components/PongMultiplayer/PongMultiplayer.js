/* eslint-disable default-case */
import React, { useLayoutEffect, useRef, useState } from 'react'
import styles from './PongMultiplayer.module.css'
import { usePongContext } from './PongContext'
import { db } from '../../config/firebase'

const PongMultiplayer = () => {
  const { roomID, player, getHandle } = usePongContext()
  const height = 400
  const width = 600
  const canvasRef = useRef(null)
  const [gameOver, setGameOver] = useState(false)
  const [twoPlayers, setTwoPlayers] = useState(false)
  const requestRef = useRef()
  let upArrowPressed = false
  const upArrowRef = useRef(upArrowPressed)
  let downArrowPressed = false
  const downArrowRef = useRef(downArrowPressed)
  let upArrowOpp = false
  const upArrowOppRef = useRef(upArrowOpp)
  let downArrowOpp = false
  const downArrowOppRef = useRef(downArrowOpp)
  let handle = getHandle()
  let name = ''
  const nameRef = useRef(name)
  const [winner, setWinner] = useState('')
  const ref = useRef()

  function getHandleOpp() {
    if (player === 1) {
      db.collection('gamesRoom')
        .doc(roomID)
        .onSnapshot((doc) => {
          nameRef.current = doc.data().player2Handle
        })
    } else {
      db.collection('gamesRoom')
        .doc(roomID)
        .onSnapshot((doc) => {
          nameRef.current = doc.data().player1Handle
        })
    }
  }

  const ball = {
    x: width / 2,
    y: height / 2,
    dx: 5,
    dy: 5,
    speed: 7,
    radius: 10,
  }

  const paddle1 = {
    x: 0,
    y: height / 2 - 50,
    paddleWidth: 10,
    paddleHeight: 100,
    score: 0,
  }

  const paddle2 = {
    x: width - 10,
    y: height / 2 - 50,
    paddleWidth: 10,
    paddleHeight: 100,
    score: 0,
  }

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

  function checkTwoPlayers() {
    db.collection('gamesRoom')
      .doc(roomID)
      .onSnapshot((doc) => {
        if (doc.data().numPlayer === 2) {
          setTwoPlayers(true)
        }
      })
    console.log(twoPlayers)
    return twoPlayers
  }

  function initBall() {
    db.collection('gamesRoom')
      .doc(roomID)
      .update({
        ballX: width / 2,
        ballY: height / 2,
        balldx: 5,
        balldy: 5,
        ballSpeed: 7,
      })
  }

  function getBallUpdate() {
    db.collection('gamesRoom')
      .doc(roomID)
      .onSnapshot((doc) => {
        ball.dx = doc.data().balldx
        ball.dy = doc.data().balldy
        ball.speed = doc.data().ballSpeed
      })
  }

  function sendBallData(dx, dy, speed) {
    db.collection('gamesRoom').doc(roomID).update({
      balldx: dx,
      balldy: dy,
      ballSpeed: speed,
    })
  }

  function sendUpKey(upArrowPressed) {
    if (player === 1) {
      db.collection('gamesRoom').doc(roomID).update({
        upArrowPressed1: upArrowPressed,
      })
    } else {
      db.collection('gamesRoom').doc(roomID).update({
        upArrowPressed2: upArrowPressed,
      })
    }
  }

  function sendDownKey(downArrowPressed) {
    if (player === 1) {
      db.collection('gamesRoom').doc(roomID).update({
        downArrowPressed1: downArrowPressed,
      })
    } else {
      db.collection('gamesRoom').doc(roomID).update({
        downArrowPressed2: downArrowPressed,
      })
    }
  }

  function getUpKey() {
    if (player === 1) {
      db.collection('gamesRoom')
        .doc(roomID)
        .onSnapshot((doc) => {
          upArrowOppRef.current = doc.data().upArrowPressed2
        })
    } else {
      db.collection('gamesRoom')
        .doc(roomID)
        .onSnapshot((doc) => {
          upArrowOppRef.current = doc.data().upArrowPressed1
        })
    }
    return upArrowOppRef.current
  }

  function getDownKey() {
    if (player === 1) {
      db.collection('gamesRoom')
        .doc(roomID)
        .onSnapshot((doc) => {
          downArrowOppRef.current = doc.data().downArrowPressed2
        })
    } else {
      db.collection('gamesRoom')
        .doc(roomID)
        .onSnapshot((doc) => {
          downArrowOppRef.current = doc.data().downArrowPressed1
        })
    }
    return downArrowOppRef.current
  }

  function drawText(context, text, x, y) {
    context.fillStyle = 'WHITE'
    context.font = '15px pixel'
    context.fillText(text, x, y)
  }

  function drawPaddle(context, x, y, width, height, color) {
    context.fillStyle = color
    context.fillRect(x, y, width, height)
  }

  function resetBall() {
    ball.x = width / 2
    ball.y = height / 2
    ball.dx = -5
    ball.speed = 7
    //sendBallData(ball.dx, ball.dy, ball.speed)
  }

  useLayoutEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    function drawArc(x, y, r, color) {
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.arc(x, y, r, 0, Math.PI * 2, true)
      ctx.closePath()
      ctx.fill()
    }

    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawArc(ball.x, ball.y, ball.radius, 'WHITE')
      drawPaddle(
        ctx,
        paddle1.x,
        paddle1.y,
        paddle1.paddleWidth,
        paddle1.paddleHeight,
        'Yellow'
      )
      drawPaddle(
        ctx,
        paddle2.x,
        paddle2.y,
        paddle2.paddleWidth,
        paddle2.paddleHeight,
        'Green'
      )
      if (player === 1) {
        drawText(ctx, handle, width / 8, height / 10)
        drawText(ctx, nameRef.current, width / 1.25, height / 10)
        drawText(ctx, paddle1.score, width / 8, height / 6)
        drawText(ctx, paddle2.score, width / 1.25, height / 6)
      } else {
        drawText(ctx, handle, width / 1.25, height / 10)
        drawText(ctx, nameRef.current, width / 8, height / 10)
        drawText(ctx, paddle1.score, width / 8, height / 6)
        drawText(ctx, paddle2.score, width / 1.25, height / 6)
      }
    }

    if (checkTwoPlayers()) {
      initBall()
      getHandleOpp()
    } else {
      ctx.textBaseline = 'middle'
      ctx.textAlign = 'center'
      drawText(ctx, 'Waiting for another player', width / 2, height / 2)
    }

    window.addEventListener('keydown', keyDownHandler)
    window.addEventListener('keyup', keyUpHandler)

    function keyDownHandler(event) {
      event.preventDefault()
      switch (event.keyCode) {
        case 38:
          upArrowRef.current = true
          sendUpKey(upArrowRef.current)
          break
        case 40:
          downArrowRef.current = true
          sendDownKey(downArrowRef.current)
          break
      }
    }

    function keyUpHandler(event) {
      event.preventDefault()
      switch (event.keyCode) {
        case 38:
          upArrowRef.current = false
          sendUpKey(upArrowRef.current)
          break
        case 40:
          downArrowRef.current = false
          sendDownKey(downArrowRef.current)
          break
      }
    }

    function update() {
      if (player === 1 && upArrowRef.current && paddle1.y > 0) {
        paddle1.y -= 8
      } else if (player === 2 && upArrowRef.current && paddle2.y > 0) {
        paddle2.y -= 8
      }

      if (
        player === 1 &&
        downArrowRef.current &&
        paddle1.y < height - paddle1.paddleHeight
      ) {
        paddle1.y += 8
      } else if (
        player === 2 &&
        downArrowRef.current &&
        paddle2.y < height - paddle2.paddleHeight
      ) {
        paddle2.y += 8
      }

      if (getUpKey()) {
        if (player === 1 && paddle2.y > 0) {
          paddle2.y -= 8
        } else if (player === 2 && paddle1.y > 0) {
          paddle1.y -= 8
        }
      }

      if (getDownKey()) {
        if (player === 1 && paddle2.y < height - paddle2.paddleHeight) {
          paddle2.y += 8
        } else if (player === 2 && paddle1.y < height - paddle1.paddleHeight) {
          paddle1.y += 8
        }
      }

      if (ball.x - ball.radius < 0) {
        paddle2.score++
        resetBall()
      } else if (ball.x + ball.radius > width) {
        paddle1.score++
        resetBall()
      }

      ball.x = ball.x + ball.dx
      ball.y = ball.y + ball.dy
      
      if (player === 1) {
        sendBallData(ball.dx, ball.dy, ball.speed)
      }

      if (player === 2) {
        getBallUpdate()
      }

      if (
        ball.y + ball.dy < ball.radius ||
        ball.y + ball.dy > height - ball.radius
      ) {
        ball.dy = -ball.dy
        sendBallData(ball.dx, ball.dy, ball.speed)
      }

      if (paddle1.score === 3 && player === 1) {
        setGameOver(true)
        setWinner(handle)
      } else if (paddle2.score === 3 && player === 1) {
        setGameOver(true)
        setWinner(nameRef.current)
      } else if (paddle1.score === 3 && player === 2) {
        setGameOver(true)
        setWinner(nameRef.current)
      } else if (paddle2.score === 3 && player === 2) {
        setGameOver(true)
        setWinner(handle)
      }

      let playerNum = ball.x + ball.radius < width / 2 ? paddle1 : paddle2

      if (collision(ball, playerNum)) {
        let contact = ball.y - (playerNum.y + playerNum.paddleHeight / 2)

        contact = contact / (playerNum.paddleHeight / 2)

        let angleRad = contact * (Math.PI / 4)

        let direction = ball.x + ball.radius < width / 2 ? 1 : -1

        ball.dx = direction * ball.speed * Math.cos(angleRad)

        ball.dy = ball.speed * Math.sin(angleRad)

        ball.speed += 0.08
      }
    }

    function renderWinner() {
      console.log(winner)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.textBaseline = 'middle'
      ctx.textAlign = 'center'
      drawText(ctx, 'Winner is ' + winner, width / 2, height / 2)
    }

    function game() {
      update()
      render()
    }

    if (!gameOver && checkTwoPlayers()) {
      requestRef.current = setInterval(game, 1000 / 30)
    }

    if (gameOver) {
      ref.current = setTimeout(() => {
        renderWinner()
      }, 1000)
      return clearInterval(requestRef.current)
    }
  }, [gameOver, twoPlayers, winner])

  return (
    <>
      <h1 className={styles.header}> Room id: {roomID}</h1>
      <canvas
        ref={canvasRef}
        className={styles.canvasContainer}
        width={width}
        height={height}
      ></canvas>
    </>
  )
}

export default PongMultiplayer
