const Rectangle = (context, x, y, w, h, color) => {
    context.fillStyle = color;
    context.fillRect(x, y, w, h, color);
}
 
export default Rectangle;