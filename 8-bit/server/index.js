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
        this.id = -1;
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

function collision(b,p){
    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;
    
    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;
    
    return p.left < b.right && p.top < b.bottom && p.right > b.left && p.bottom > b.top;
}

function resetBall(room) {
    let ball = serverBall[room]
    ball.changePosition(width/2, height/2, -ball.dx, ball.dy)
    ball.changeSpeed(7)
}

function gameLogic(room) {
    if (serverBall[room].x - serverBall[room].radius < 0 || serverBall[room].x + serverBall[room].radius > width) {
        playerScored(room)
    }

    for(let id in playerPads) {
        if(playerPads[id].score === 5) {
            gameOver(room)
        }
    }
}

function playerScored(room) {
    let ball = serverBall[room]
    let scorerId
    if(ball.x - ball.radius < 0) {
        for(let id in playerPads) {
            if (playerPads[id].no === 2 && playerPads[id].room === room) {
                playerPads[id].score++;
                scorerId = id;
                console.log("Player 2 scored")
            }
        }
    }

    if(ball.x + ball.radius > width) {
        for(let id in playerPads) {
            if (playerPads[id].no === 1 && playerPads[id].room === room) {
                playerPads[id].score++;
                scorerId = id;
                console.log("Player 1 scored")
            }
        }
    }

    resetBall(room)
    io.to(room).emit('updateScore', scorerId)
}

function gameOver(room) {
    gameEnd = true;
    for(let id in playerPads) {
        if(playerPads[id].room === room) {
            playerPads[id].resetScore()
        }
    }
    clearInterval(loop)
}

function update(player1, player2, room) {

    let ball = serverBall[room];

    ball.changePosition(ball.x + ball.dx, ball.y + ball.dy, ball.dx, ball.dy)

    if (
      ball.y + ball.dy < ball.radius ||
      ball.y + ball.dy > height - ball.radius
    ) {
        ball.changePosition(ball.x, ball.y, ball.dx, -ball.dy)
    }

    let player = ball.x + ball.radius < width / 2 ? player1 : player2


    if (collision(ball, player)) {
        
      let contact = ball.y - (player.y + player.height / 2)

      contact = contact / (player.height / 2)

      let angleRad = contact * (Math.PI / 4)

      let direction = ball.x + ball.radius < width / 2 ? 1 : -1

      let dx = direction * ball.speed * Math.cos(angleRad)

      let dy = ball.speed * Math.sin(angleRad)

      ball.changePosition(ball.x, ball.y, dx, dy)
    
      ball.changeSpeed(ball.speed + 0.08)
      
    }
}

const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketio(server);


app.use(express.static('src'))

app.get('/', (req, res) => {
    res.send("Server is up and running")
})

io.on('connection', connected)


let playerPads = {}
let serverBall = {}
let clientNo = 0;
let roomNo;
let playerArr = []
let i = -1;
let waiting = true;
let gameEnd = false;

function connected(socket) {

    i++;
    clientNo++;
    roomNo = Math.round(clientNo / 2)
    socket.join(roomNo)

    console.log(`New client no: ${clientNo}, room no: ${roomNo}`)

    if(clientNo % 2 === 1) {
        playerPads[socket.id] = new Paddle(0, (height-100) / 2)
        playerPads[socket.id].setNo(1)
        playerPads[socket.id].setColor("WHITE")
        playerPads[socket.id].setRoom(roomNo)
        playerPads[socket.id].setID(socket.id)
        playerArr[i] = playerPads[socket.id]
    } else if (clientNo % 2 === 0) {
        playerPads[socket.id] = new Paddle(width-10, (height-100) / 2)
        playerPads[socket.id].setNo(2)
        playerPads[socket.id].setColor("BLUE")
        playerPads[socket.id].setRoom(roomNo)
        playerPads[socket.id].setID(socket.id)
        serverBall[roomNo] = new Ball(width/2, height/2, 5, 5, 7);
        serverBall[roomNo].setRoom(roomNo);
        playerArr[i] = playerPads[socket.id]
        io.emit('updateFootball', {x: serverBall[roomNo].x, y: serverBall[roomNo].y})
    }
    

    for(let id in playerPads) {
        io.to(playerPads[id].room).emit('updateConnections', playerPads[id])
    }

    socket.on('positionUpdate', (data,id) => {
        playerPads[id].setPosition(data)
    })

    socket.on('disconnect', function() {
        delete serverBall[serverBall[playerPads[socket.id].room]]
        io.to(playerPads[socket.id].room).emit('deletePlayer', playerPads[socket.id])
        delete playerPads[socket.id];
        io.emit('updateConnections', playerPads)
    })
}

if(gameEnd) {
    io.emit('updateGameover', gameEnd)
}

function serverLoop(){
     
    for(let num = 0; num < i; num++) {
        if(playerArr[num].room === playerArr[num + 1].room) {
            update(playerArr[num], playerArr[num + 1], playerArr[num].room)
        }
    }

    for(let id in playerPads) {
        io.to(playerPads[id].room).emit('updatePosition', playerPads, id)
    }

    for(let room = 1; room <= roomNo; room++) {
        if(serverBall[room] === undefined) {
            io.emit('waitingPlayer', waiting)
        } else {
            gameLogic(room)
            io.to(room).emit('updateBall', serverBall[room])
        }
    }
}

let loop = setInterval(serverLoop, 1000/60)

server.listen(process.env.PORT || 3001, () => console.log(`Server has started.`));