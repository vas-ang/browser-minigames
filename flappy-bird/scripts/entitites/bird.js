import { SpriteAnimatedObject } from "./contracts/spriteAnimatedObject.js";

export class Bird extends SpriteAnimatedObject {
  constructor(x, y, width, height, gravity, sprite, framesPerImage) {
    super(x, y, width, height, sprite, framesPerImage);

    this.gravity = gravity;
    this.speed = 0;

    this.birdHeadX = this.x + this.width;
  }

  move() {
    return (this.y += this.speed += this.gravity);
  }

  hasCrashedWithPipe(pipe) {
    const birdBottomY = this.y + this.height;
    const isInPipeHeadRange =
      this.birdHeadX > pipe.pipeHeadX &&
      this.x < pipe.pipeHeadX + pipe.width &&
      ((this.y < pipe.passY && this.y > pipe.topPipeHeadY) ||
        (this.y > pipe.bottomPipeHeadY &&
          birdBottomY < pipe.bottomPipeMiddleY));

    const isInPipeBodyRange =
      this.birdHeadX > pipe.pipeHeadX + pipe.innerPipeXOffset &&
      this.x < pipe.pipeHeadX + pipe.width - pipe.innerPipeXOffset &&
      (this.y < pipe.topPipeHeadY || birdBottomY > pipe.bottomPipeMiddleY);

    return isInPipeHeadRange || isInPipeBodyRange;
  }

  hasCrashedWithGround(ground) {
    return this.y + this.height > ground.y;
  }

  calculateMovementOutcomes(ground, pipes) {
    if (
      this.hasCrashedWithGround(ground) &&
      typeof this.onGroundCollision === "function"
    ) {
      this.onGroundCollision();
    }

    for (const pipe of pipes) {
      if (
        this.hasCrashedWithPipe(pipe) &&
        typeof this.onPipeCollision === "function"
      ) {
        this.onPipeCollision();
      }

      if (
        pipe.pipeHeadX + pipe.pipeHead.width / 2 < this.x &&
        !pipe.isBypassedByBirdExecuted &&
        typeof this.onPipeBypassed === "function"
      ) {
        this.onPipeBypassed();
        pipe.isBypassedByBirdExecuted = true;
        break;
      }
    }
  }
}
