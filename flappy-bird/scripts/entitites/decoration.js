export class Decoration {
  constructor(x, y, image) {
    this.x = x;
    this.y = y;
    this.image = image;
  }

  draw(context) {
    context.drawImage(this.image, this.x, this.y);
  }
}
