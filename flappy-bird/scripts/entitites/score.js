export class Score {
  constructor(initialValue, outerColor, innerColor, fontSize, font) {
    this.value = initialValue;
    this.outerColor = outerColor;
    this.innerColor = innerColor;
    this.fontSize = fontSize;
    this.font = font;
  }

  draw(context) {
    const x = context.canvas.width / 2;
    const y = context.canvas.height / 3;

    context.font = `${this.fontSize} ${this.font}`;
    context.textAlign = "center";
    context.fillStyle = this.innerColor;
    context.fillText(this.value, x, y);
    context.strokeStyle = this.outerColor;
    context.strokeText(this.value, x, y);
  }
}
