const Text = (context, text, x, y, color) => {
    context.fillStyle = color;
    context.font = '45px fantasy';
    context.fillText(text, x, y);
}
 
export default Text;