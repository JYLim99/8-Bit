//List of helper function

//Conversion for degree to radian vice versa
export const toDegrees = (radians) => (radians * 180) / Math.PI
export const toRadians = (degrees) => (degrees * Math.PI) / 180

//Generate a range of number
export const getRange = (length) => [...Array(length).keys()]

//Receive number of arguments then compare as many arguments as we want
//Gets a random argument and return it
export const getRandomFrom = (...args) =>
  args[Math.floor(Math.random() * args.length)]

//Similar to flatmap, 2D array and return a 1D array
export const flatten = (arrays) =>
  arrays.reduce((acc, row) => [...acc, ...row], [])

//Take in array and an element that is not needed
//Return new array (immutated) that removes this element
export const withoutElement = (array, element) =>
  array.filter((e) => e !== element)

//Take in array, update element
export const updateElement = (array, oldElement, newElement) =>
  array.map((e) => (e === oldElement ? newElement : e))

//Event listener to watch out for resize
//Determine how much space is available for scene
export const registerListener = (eventName, handler) => {
  window.addEventListener(eventName, handler)
  return () => window.removeEventListener(eventName, handler)
}
