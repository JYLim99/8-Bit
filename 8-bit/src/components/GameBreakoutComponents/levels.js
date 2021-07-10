import { getRange } from '../GameBreakoutComponents/utils'

//Determine maximum hit a block need to be taken out
export const BLOCK_MAX_DENSITY = 3

//Generate random number from 1 to 3
const getRandomBlock = () => Math.floor(Math.random() * BLOCK_MAX_DENSITY)

//Generate 2D array of blocks given rows & columns
const getBlocks = (rows, columns) =>
  getRange(rows).map(() => getRange(columns).map(getRandomBlock))

//Create an array of levels with specifications
export const LEVELS = [
  {
    lives: 5,
    paddleWidth: 2,
    speed: 1.2,
    blocks: getBlocks(3, 6),
  },
  {
    lives: 4,
    paddleWidth: 2,
    speed: 1.4,
    blocks: getBlocks(4, 7),
  },
  {
    lives: 3,
    paddleWidth: 1.5,
    speed: 1.8,
    blocks: getBlocks(5, 8),
  },
  {
    lives: 3,
    paddleWidth: 1,
    speed: 2.2,
    blocks: getBlocks(6, 9),
  },
]
