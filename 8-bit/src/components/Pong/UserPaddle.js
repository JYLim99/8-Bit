import { Dimensions } from './Dimensions';

const { height } = Dimensions;

export const user= {
    x: 0,
    y: height / 2 - 50,
    paddleWidth: 10,
    paddleHeight: 100,
    score: 0
}

export function drawUser(context) {
    context.fillStyle = "WHITE";
    context.fillRect(user.x, user.y, user.paddleWidth, user.paddleHeight);
}

export function resetUser() {
    user.x = 0;
    user.y = height / 2 - 50;
    user.paddleWidth = 10;
    user.paddleHeight = 100;
    user.score = 0;
}