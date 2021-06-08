import { Dimensions } from './Dimensions';

const { height, width } = Dimensions;

export const com = {
    x: width - 10,
    y: height / 2 - 50,
    paddleWidth: 10,
    paddleHeight: 100,
    computerLevel: 0.030
}

export function drawCom(context) {
    context.fillStyle = "WHITE";
    context.fillRect(com.x, com.y, com.paddleWidth, com.paddleHeight);
}

export function resetCom() {
    com.x = width - 10;
    com.y = height / 2 - 50;
    com.paddleWidth = 10;
    com.paddleHeight = 100;
    com.score = 0;
}