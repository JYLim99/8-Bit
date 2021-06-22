import { Dimensions } from './Dimensions';

const { height, width } = Dimensions;

export const ball = {
    x: width / 2,
    y: height / 2,
    radius: 10,
    dx: 5,
    dy: 5,
    speed: 7
}

export function drawBall(context, canvas) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "WHITE";
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();
}