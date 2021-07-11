import React, { Component } from 'react'
import Player from '../Player/Player'
import Alien from '../Alien/Alien'
import StartScreen from '../../../pages/SpaceInvaders/Start'
import EndScreen from '../../../pages/SpaceInvaders/End'
import './Ui.css'
import './Game.css'
import '../Alien/keyframes.css'
import { LEVELS } from '../Levels'

import { db } from '../../../config/firebase'
import store from '../../../redux/store'

async function addScoreToDatabase(handle, newScore) {
  let dbScore = await db
    .collection('spaceInvadersScores')
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
    db.collection('spaceInvadersScores')
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

//Key bindings
const KEY = {
  LEFT: 37,
  RIGHT: 39,
  UP: 38,
  A: 65,
  D: 68,
  W: 87,
  SPACE: 32,
  PAUSE: 80,
}

class Game extends Component {
  //Settings for the game
  constructor() {
    super()
    this.laserPositions = []
    this.ulPos = []
    this.aliens = []
    this.level = 0

    //Determines the current level
    this.state = LEVELS[this.level]
  }
  componentDidMount() {
    window.addEventListener('keyup', this.handleKeys.bind(this, false))
    window.addEventListener('keydown', this.handleKeys.bind(this, true))
    window.addEventListener('mousedown', this.handleKeys.bind(this, false))
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleKeys)
    window.removeEventListener('keydown', this.handleKeys)
    this.setState({ fuse: true })
  }

  //Function to add points
  addScore(points) {
    if (this.state.inGame) {
      this.setState({
        currentScore: this.state.currentScore + points,
      })
    }
  }

  //Function to initiate game
  startGame() {
    const context = this.refs.canvas.getContext('2d')
    this.setState({
      context: context,
    })
    this.level = 1
    this.setState(LEVELS[this.level])

    this.generateAliens()
    this.animateAliens()
    requestAnimationFrame(() => {
      this.update()
    })
  }

  nextLevel() {
    //console.log(this.level)
    this.level = this.level + 1
    this.setState(LEVELS[this.level])
    //console.log(this.level)

    this.generateAliens()
    requestAnimationFrame(() => {
      this.update()
    })
  }

  //Function to pause game
  pauseGame() {
    const context = this.refs.canvas.getContext('2d')
    this.setState({
      context: context,
      pause: true,
      inGame: false,
    })
  }

  //Function to resume game after pause
  resumeGame() {
    const context = this.refs.canvas.getContext('2d')
    this.setState({
      context: context,
      pause: false,
      inGame: true,
    })

    this.animateAliens()
    this.update()
  }

  //Function for game over (player loses)
  gameOver() {
    this.setState({
      inGame: false,
      screen: 'end',
    })

    const token = localStorage.FBIdToken
    if (token) {
      let handle = store.getState().user.credentials.handle
      addScoreToDatabase(handle, this.state.currentScore)
    }

    /*Local storage
    if (this.state.currentScore > this.state.topScore) {
      this.setState({
        topScore: this.state.currentScore,
      })
      localStorage['topscore'] = this.state.currentScore
    }*/
  }

  //Function to generate aliens
  generateAliens() {
    this.aliens = []
    const row = this.state.alien.row
    const col = this.state.alien.column
    const noOfAliens = row * col
    const width = this.state.alien.width
    const height = this.state.alien.height
    const padding = this.state.alien.padding
    const getColMultiplier = (i) => {
      const hp = height + padding
      const rowPlier = Math.floor(i / row)
      let result = hp * rowPlier
      return result + this.state.alien.startPos.top
    }
    let createArr = Array.from({ length: noOfAliens }, (v, i) => i)
    let alienObjs = createArr.map((item, index) => {
      let itemObj = {
        index: noOfAliens - index,
        left:
          (width + padding) * (index % row) + this.state.alien.startPos.left,
        top: getColMultiplier(index),
        col: col,
        start: this.state.alien.startPos.left,
        row: Math.floor(index / row) + 1,
        dir: 'right',
        explode: false,
      }
      return itemObj
    })
    this.aliens = alienObjs
  }

  //Function to animate aliens
  animateAliens() {
    let newDir = this.state.animateDir
    let newDiff = this.state.difficult
    let newSteps = this.state.steps
    let nextRow = this.state.nextRow

    const movement = this.state.alien.movement
    const alienWidth = this.state.alien.width + this.state.alien.padding
    const maxLeft = this.state.settings.width - this.state.alien.movement.right
    const maxTop =
      this.state.settings.height -
      (this.state.alien.width + this.state.alien.padding)
    const minLeft = this.state.alien.movement.left

    this.aliens.map((item, i, a) => {
      if (alienWidth + item.left > this.state.maxAlienRight) {
        this.setState({
          maxAlienRight: alienWidth + item.left,
        })
      }

      if (item.left < this.state.maxAlienLeft) {
        this.setState({
          maxAlienLeft: item.left,
        })
      }

      if (i === a.length - 1) {
        if (this.state.maxAlienRight >= maxLeft && newDir === 'right') {
          newDir = 'down'
          newSteps++
        } else if (
          this.state.maxAlienLeft - movement.side <= minLeft &&
          newDir === 'left'
        ) {
          newDir = 'down'
          newSteps++
        } else if (newDir === 'down') {
          //Alien moving down
          if (
            newDiff % this.state.alien.column ===
            this.state.alien.column - 1
          ) {
            if (a[a.length - 1].top >= maxTop) {
              this.gameOver()
              newDir = 'end'
            } else if (newSteps % 2 === 1) {
              newDir = 'left'
            } else {
              newDir = 'right'
            }
            newDiff = 0
          } else {
            newDiff++
          }
        }
        this.setState({
          animateDir: newDir,
          difficult: newDiff,
          steps: newSteps,
        })
      }

      /*
            if (
                alienWidth * item.col +
                    item.left -
                    this.state.alien.startPos.left >=
                    maxLeft &&
                newDir === "right"
            ) {
                newDir = "down"
                newSteps++
                this.setState({
                    animateDir: newDir,
                    difficult: newDiff,
                    steps: newSteps,
                })
            }*/

      if (this.checkPlayerCollision(item)) {
        newDir = 'end'
      } else if (item.row === nextRow) {
        if (newDir === 'right') {
          item.left += movement.side
        } else if (newDir === 'down') {
          item.top += movement.down
        } else if (newDir === 'left') {
          item.left -= movement.side
        }
      }
      return item
    })
    nextRow = nextRow - 1 < 1 ? 5 : nextRow - 1
    this.setState({
      animate: this.state.animate + 1,
      nextRow: nextRow,
      animateDir: newDir,
    })

    setTimeout(() => {
      if (this.state.inGame) {
        this.animateAliens()
      }
    }, this.state.settings.animateDelay)
  }

  //Function for player explosion
  playerExplode() {
    this.setState({
      user: { ...this.state.user, explode: true },
    })

    setTimeout(() => {
      this.setState({
        user: { ...this.state.user, show: false },
      })
      this.gameOver()
    }, 150)
  }

  //Function to check if there is collision between alien and user
  checkPlayerCollision(item) {
    let uXLeft = this.state.user.pos.x
    let uXRight = uXLeft + this.state.user.width
    let uYTop =
      this.state.settings.height -
      (this.state.user.height + this.state.user.pos.padding)
    if (item.left >= uXLeft && item.left <= uXRight) {
      if (item.top + this.state.alien.height >= uYTop) {
        this.playerExplode()
        return true
      }
    }
    return false
  }

  //Function to determine the behaviour when key is pressed
  //Position of player, shooting and pause is controlled here
  handleKeys(value, e) {
    let keys = this.state.keys
    let fuse = this.state.fuse
    if (e.keyCode === KEY.LEFT || e.keyCode === KEY.A) keys.left = value
    if (e.keyCode === KEY.RIGHT || e.keyCode === KEY.D) keys.right = value
    if (e.keyCode === KEY.UP || e.keyCode === KEY.W) keys.up = value
    if (e.keyCode === KEY.SPACE) keys.space = value
    if (e.keyCode === KEY.PAUSE) keys.p = value
    if (keys.p && !this.state.pause) {
      this.pauseGame()
    } else if (keys.p && this.state.pause) {
      this.resumeGame()
    }
    if (keys.left && this.state.inGame) {
      this.playerPos('left')
    }
    if (keys.right && this.state.inGame) {
      this.playerPos('right')
    }
    if (keys.space && this.state.inGame) {
      if (!fuse) {
        fuse = true
        this.shoot()
      }
    }
    this.setState({
      keys: keys,
      fuse: fuse,
    })
    if (e.type === 'mousedown') {
      if (this.state.screen === 'start' || this.state.screen === 'end') {
        this.setState({ screen: 'game' })
        this.startGame()
      }
    }
  }

  //Function to remove alien that has been shot
  removeAlien(index) {
    this.setState({
      maxAlienRight: 0,
      maxAlienLeft: Infinity,
    })
    this.aliens[index].explode = true
    setTimeout(() => {
      this.aliens.splice(index, 1)
      this.setState({
        fuse: false,
      })
    }, 100)
  }

  //Function to add score based on the position of the alien
  addPoints(row) {
    let oldScore = this.state.currentScore
    oldScore += 1000 * Math.abs(row - (this.state.alien.column + 1))
    this.setState({
      currentScore: oldScore,
    })
  }

  unidentifiedLaserBeams() {
    let randomRow = Math.floor(Math.random() * this.state.alien.row)
    let randomAlien = this.aliens.filter((item, i, a) => {
      return item.index % this.state.alien.row === randomRow
    })

    if (randomAlien.length > 0) {
      randomAlien = randomAlien.reduce((prev, curr) => {
        return prev.index < curr.index ? prev : curr
      })
    } else {
      this.unidentifiedLaserBeams()
    }

    let posX = randomAlien.left + this.state.alien.width / 2
    let posY =
      randomAlien.top + this.state.alien.height + this.state.alien.padding
    this.ulPos.push({ x: posX, y: posY })
  }

  //Function to check for collision between player shot and aliens
  checkCollision(shot, index) {
    if (shot.y < 0) {
      this.setState({ fuse: false })
      return false
    }

    let hitAliens = this.aliens.filter((alien, index) => {
      if (
        shot.y - this.state.laser.height <=
          alien.top + this.state.alien.height &&
        shot.y - this.state.laser.height >= alien.top &&
        shot.x >= alien.left &&
        shot.x <= alien.left + this.state.alien.width
      ) {
        this.setState((prevState) => {
          return { alienCount: prevState.alienCount - 1 }
        })
        this.removeAlien(index)
        this.addPoints(alien.row)
        return true
      }
      return false
    })
    return hitAliens.length > 0 ? false : true
  }

  //Function to check for collistion between alien shot and player
  playerCollision(shot, index) {
    if (shot.y > this.state.settings.height) {
      this.setState({ alienLaserFuse: false })
      return false
    }

    let uXLeft = this.state.user.pos.x
    let uXRight = uXLeft + this.state.user.width
    let uYTop =
      this.state.settings.height -
      (this.state.user.height + this.state.user.pos.padding)

    if (shot.x >= uXLeft && shot.x <= uXRight) {
      if (shot.y - this.state.laser.alienHeight >= uYTop) {
        this.playerExplode()
        return false
      }
    }

    return true
  }

  //Main loop of the canvas, updates the state of the game
  update() {
    //Loop to keep the game going
    if (!this.state.pause) {
      const context = this.state.context

      context.clearRect(
        0,
        0,
        this.state.settings.width,
        this.state.settings.height
      )
      context.fillStyle = '#0f0'

      let newArray = this.laserPositions
        .map((beam) => {
          let newY = beam.y - this.state.laser.speed
          let cx = beam.x - this.state.laser.width / 2
          let cy = newY - this.state.laser.height
          context.fillRect(
            cx,
            cy,
            this.state.laser.width,
            this.state.laser.height
          )
          return { x: beam.x, y: newY }
        })
        .filter(this.checkCollision.bind(this))

      this.laserPositions = newArray

      context.fillStyle = '#f00'
      if (!this.state.alienLaserFuse) {
        this.setState({
          alienLaserFuse: true,
        })
        this.unidentifiedLaserBeams()
      }

      let newAlienArray = this.ulPos
        .map((beam) => {
          let newY = beam.y + this.state.laser.alienSpeed
          let cx = beam.x - this.state.laser.alienWidth / 2
          let cy = newY - this.state.laser.alienHeight
          context.fillRect(
            cx,
            cy,
            this.state.laser.alienWidth,
            this.state.laser.alienHeight
          )
          return { x: beam.x, y: newY }
        })
        .filter(this.playerCollision.bind(this))

      this.ulPos = newAlienArray

      if (this.level === 3) {
        //Winning the game
        this.gameOver()
      } else if (this.state.alienCount === 0) {
        //Going to the next level
        this.nextLevel()
      } else if (this.state.inGame) {
        requestAnimationFrame(() => {
          this.update()
        })
      } else {
        this.laserPositions = [{ x: 0, y: 0 }]
        context.clearRect(
          0,
          0,
          this.state.settings.width,
          this.state.settings.height
        )
      }
    }
  }

  //Function for player position on the canvas
  playerPos(dir) {
    let user = this.state.user
    if (dir === 'left') {
      user.pos.x -= this.state.settings.sensitivity
    } else {
      user.pos.x += this.state.settings.sensitivity
    }
    let windowWidth = this.state.settings.width - this.state.user.width
    user.pos.x =
      user.pos.x < 0 ? 0 : user.pos.x > windowWidth ? windowWidth : user.pos.x
  }

  //Function to shoot
  shoot() {
    let posX = this.state.user.pos.x + this.state.user.width / 2
    let posY =
      this.state.settings.height -
      (this.state.user.height + this.state.user.pos.padding)
    this.laserPositions.push({ x: posX, y: posY })
  }

  //Generating the canvas for the game
  render() {
    let styles = {
      width: this.state.settings.width,
      height: this.state.settings.height,
    }

    return (
      <div className='page'>
        <div className='App--Game' style={styles}>
          <span className='App--Game-CurrScore App--Game-Gui'>
            <p>score: {this.state.currentScore}</p>
          </span>
          <canvas
            className='App--Canvas'
            ref='canvas'
            width={this.state.settings.width}
            height={this.state.settings.height}
          />
          {this.aliens.map((item, index) => (
            <Alien
              key={index}
              alienIndex={item.index}
              alienLeft={item.left}
              alienTop={item.top}
              alienWidth={this.state.alien.width}
              alienHeight={this.state.alien.height}
              explode={item.explode}
            ></Alien>
          ))}
          <Player
            userShow={this.state.user.show}
            userExplode={this.state.user.explode}
            userLeft={this.state.user.pos.x}
            userTop={
              this.state.settings.height -
              (this.state.user.height + this.state.user.pos.padding)
            }
            userWidth={this.state.user.width}
            userHeight={this.state.user.height}
          ></Player>
          <StartScreen
            topScore={this.state.topScore}
            screen={this.state.screen}
          ></StartScreen>
          <EndScreen
            //topScore={this.state.topScore}
            currScore={this.state.currentScore}
            screen={this.state.screen}
          ></EndScreen>
        </div>
      </div>
    )
  }
}

export default Game

/*High score gui
<span className='App--Game-TopScore App--Game-Gui'>
            <p>hi-score: {this.state.topScore}</p>
          </span>*/
