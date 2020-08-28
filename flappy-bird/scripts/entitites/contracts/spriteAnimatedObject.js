export class SpriteAnimatedObject {
  constructor(x, y, width, height, sprite, framesPerImage) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.sprite = sprite;
    this.currentImage = 0;
    this.framesPerImage = framesPerImage ? framesPerImage : 1;
    this.frame = 1;
  }

  draw(context) {
    let currentImageWidth = this.width * this.currentImage;

    if (currentImageWidth >= this.sprite.width) {
      this.currentImage = 0;
      currentImageWidth = this.width * this.currentImage;
    }

    context.drawImage(
      this.sprite,
      currentImageWidth,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );

    if (this.frame++ % this.framesPerImage === 0) {
      this.currentImage++;
    }
  }
}
