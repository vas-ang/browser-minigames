export class Button {
  constructor(x, y, image, canvas) {
    this.x = x;
    this.y = y;
    this.image = image;
    this.canvas = canvas;
  }

  addClickEvent(callback) {
    const func = (e) => {
      const { top, left, width, height } = this.canvas.getBoundingClientRect();

      let xCoef = 1,
        yCoef = 1;

      if (this.canvas.width > width) {
        xCoef = width / this.canvas.width;
      }
      if (this.canvas.height > height) {
        yCoef = height / this.canvas.height;
      }

      const a = this.x * xCoef;
      const b = this.image.width * xCoef;
      const c = this.y * yCoef;
      const d = this.image.height * yCoef;

      if (
        a + left <= e.clientX &&
        e.clientX <= a + left + b &&
        c + top <= e.clientY &&
        e.clientY <= c + top + d
      ) {
        callback.call(this, func);
      }
    };
    this.canvas.addEventListener("click", func);
  }

  removeClickEvent(callback) {
    this.canvas.removeEventListener("click", callback);
  }

  draw(context) {
    context.drawImage(this.image, this.x, this.y);
  }
}
