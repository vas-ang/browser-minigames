export class Ground {
  constructor(x, y, image) {
    this.x = x;
    this.y = y;
    this.image = image;
    this.xOffset = this.image.width - 1;
    this.move = true;
  }

  draw(context) {
    let currentX = this.x - this.xOffset;

    while (currentX < context.canvas.width) {
      context.drawImage(this.image, currentX, this.y);

      currentX += this.image.width;
    }
    
    if (this.move) {
      this.xOffset++;
    }
  }
}
