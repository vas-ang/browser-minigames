export class Pipe {
  constructor(initialX, passY, passHeight, pipeHead, pipeMiddle, pipeBody) {
    this.pipeHead = pipeHead;
    this.pipeMiddle = pipeMiddle;
    this.pipeBody = pipeBody;

    this.pipeHeadX = initialX;
    this.innerPipeXOffset = Math.round(
      (this.pipeHead.width - this.pipeMiddle.width) / 2
    );
    this.width = this.pipeHead.width;

    this.passY = passY;
    this.passHeight = passHeight;

    this.topPipeHeadY = this.passY - this.pipeHead.height;

    this.pipeMiddleY =
      this.passY - this.pipeHead.height - this.pipeMiddle.height;
    this.bottomPipeHeadY = this.passY + this.passHeight;
    this.bottomPipeMiddleY = this.bottomPipeHeadY + this.pipeHead.height;
    this.bottomPipeBodyY = this.bottomPipeMiddleY + this.pipeMiddle.height;

    this.isBypassedByBirdExecuted = false;

    this.canvasTopmostY = 0;
  }

  draw(context) {
    context.drawImage(
      this.pipeBody,
      this.pipeHeadX + this.innerPipeXOffset,
      this.canvasTopmostY,
      this.pipeBody.width,
      this.pipeMiddleY
    );
    context.drawImage(
      this.pipeMiddle,
      this.pipeHeadX + this.innerPipeXOffset,
      this.pipeMiddleY
    );
    context.drawImage(this.pipeHead, this.pipeHeadX, this.topPipeHeadY);

    context.drawImage(this.pipeHead, this.pipeHeadX, this.bottomPipeHeadY);
    context.drawImage(
      this.pipeMiddle,
      this.pipeHeadX + this.innerPipeXOffset,
      this.bottomPipeMiddleY
    );
    context.drawImage(
      this.pipeBody,
      this.pipeHeadX + this.innerPipeXOffset,
      this.bottomPipeBodyY,
      this.pipeBody.width,
      context.canvas.height
    );
  }

  move(distance) {
    this.pipeHeadX -= distance;

    if (
      this.pipeHeadX <= -this.pipeHead.width &&
      typeof this.onPipeDisappeared === "function"
    ) {
      this.onPipeDisappeared();
    }

    return this.pipeHeadX;
  }
}
