export class Playground {
  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.canvas = document.createElement("canvas");
    this.canvas.classList.add("playground");
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.elements = [];

    this.context = this.canvas.getContext("2d");
  }

  clear() {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  draw(el) {
    if (el !== undefined && typeof el.draw === "function") {
      el.draw(this.context);
    }
  }

  addDrawElement(el, order) {
    if (order === undefined) {
      this.elements.push(el);

      return this.elements.length - 1;
    }

    this.elements.splice(order, 0, el);

    return order;
  }

  removeDrawElement(el) {
    const elIndex = this.elements.indexOf(el);

    if (elIndex === -1) {
      throw new Error("Element not found!");
    }

    this.elements.splice(elIndex, 1);
  }

  render() {
    this.clear();

    for (const element of this.elements) {
      if (Array.isArray(element)) {
        element.forEach((e) => e.draw(this.context));
        continue;
      }

      element.draw(this.context);
    }
  }
}
