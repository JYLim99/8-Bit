import React, { useRef, useEffect, useState } from "react"
import { ball, drawBall, resetBall } from "./Ball"
import { user, drawUser, resetUser } from "./UserPaddle"
import { com, drawCom, resetCom } from "./ComPaddle"
import { Dimensions } from "./Dimensions"
import styles from "./Pong.module.css"

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
  context.fillStyle = "WHITE"
  context.font = "15px orbitron"
  context.fillText(text, x, y)
}

function restartGame() {
  resetUser()
  resetCom()
  resetBall()
}

let lives = 5

const Pong = () => {
  const canvasRef = useRef(null)
  const [gameOver, setGameOver] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext("2d")

    function render() {
      drawBall(context, canvas)
      drawUser(context)
      drawCom(context)
      drawText(context, "SCORE: ", width / 15, height / 10)
      drawText(context, user.score, width / 5, height / 10)
      drawText(context, "TRIES REMAINING: ", width / 1.65, height / 10)
      drawText(context, lives, width / 1.125, height / 10)
    }

    canvas.addEventListener("mousemove", movePaddle)

    function movePaddle(event) {
      let rect = canvas.getBoundingClientRect()

      user.y = event.clientY - rect.top - user.paddleHeight / 2
    }

    function update() {
      if (ball.x - ball.radius < 0) {
        lives--
        resetBall()
      } else if (ball.x + ball.radius > width) {
        user.score++
        com.computerLevel += 0.005
        resetBall()
      }

      if (lives === 0) {
        setGameOver(true)
      }

      ball.x += ball.dx
      ball.y += ball.dy

      com.y += (ball.y - (com.y + com.paddleHeight / 2)) * com.computerLevel

      if (
        ball.y + ball.dy < ball.radius ||
        ball.y + ball.dy > height - ball.radius
      ) {
        ball.dy = -ball.dy
      }

      let player = ball.x + ball.radius < width / 2 ? user : com

      if (collision(ball, player)) {
        let contact = ball.y - (player.y + player.paddleHeight / 2)

        contact = contact / (player.paddleHeight / 2)

        let angleRad = contact * (Math.PI / 4)

        let direction = ball.x + ball.radius < width / 2 ? 1 : -1

        ball.dx = direction * ball.speed * Math.cos(angleRad)

        ball.dy = ball.speed * Math.sin(angleRad)

        ball.speed += 1
      }
    }

    function game() {
      update()
      render()
      requestAnimationFrame(game)
    }

    if (gameStarted) {
      game()
    }
  }, [gameStarted])

  if (!gameOver) {
    return (
      <>
        <h3 className={styles.instructs}>
          <strong> Instructions: </strong>
        </h3>
        <div className={styles.instructsBody}>
          <ui>
            <ul> Press start game to play </ul>
            <ul> Move your mouse up and down to move </ul>
            <ul> You have 5 tries before you lose</ul>
          </ui>
        </div>
        <div>
          <canvas
            ref={canvasRef}
            height={height}
            width={width}
            className={styles.canvasContainer}
          />
          <button
            className={styles.gameButton}
            onClick={() => {
              setGameStarted(true)
            }}
          >
            {" "}
            Start game
          </button>
        </div>
      </>
    )
  } else {
    return (
      <div className={styles.gameOver}>
        <h1> GAME OVER! Your score: {user.score}</h1>
        <button
          onClick={() => {
            setGameOver(false)
            restartGame()
            window.location.reload()
          }}
        >
          {" "}
          Restart{" "}
        </button>
      </div>
    )
  }
}

export default Pong
