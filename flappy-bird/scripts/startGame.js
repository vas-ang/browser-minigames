import { Pipe } from "./entitites/pipe.js";
import loadGame from "./loadGame.js";

export default function startGame(
  playground,
  button,
  score,
  player,
  gameSettings,
  ground,
  images,
  pipes
) {
  playground.removeDrawElement(button);
  playground.addDrawElement(score);

  function flap() {
    player.speed = gameSettings.initJumpSpeed;
  }

  playground.canvas.addEventListener("click", flap);

  const fps = gameSettings.framesPerSecond;
  const minDelay = (1000 / 60) * (60 / fps) - (1000 / 60) * 0.5;
  let lastFrameTime = 0,
    framesElapsed = 0,
    pipeMovePixels = gameSettings.pipeMovePixelsPerFrame,
    continueRendering = true;

  player.onGroundCollision = function () {
    continueRendering = false;
    button.addClickEvent(async function (fn) {
      button.removeClickEvent(fn);
      document.body.removeChild(playground.canvas);
      await loadGame();
    });
    playground.addDrawElement(button);
    playground.render();
  };

  player.onPipeCollision = function () {
    playground.canvas.removeEventListener("click", flap);
    pipeMovePixels = 0;
    ground.move = false;
  };

  player.onPipeBypassed = function () {
    score.value++;
  };

  function update(time) {
    if (!continueRendering) {
      return;
    }

    if (time - lastFrameTime < minDelay) {
      requestAnimationFrame(update);
      return;
    }
    lastFrameTime = time;

    framesElapsed++;
    if (framesElapsed % gameSettings.framesPerPipe === 0) {
      const pipe = new Pipe(
        gameSettings.canvasWidth,
        Math.floor(
          Math.random() * (gameSettings.passYMax - gameSettings.passYMin) +
            gameSettings.passYMin
        ),
        gameSettings.passHeight,
        images.pipeTop,
        images.pipeMiddle,
        images.pipeBody
      );

      pipe.onPipeDisappeared = function () {
        pipes.shift();
      };

      pipes.push(pipe);
    }

    player.move();
    pipes.forEach((x) => x.move(pipeMovePixels));

    player.calculateMovementOutcomes(ground, pipes);

    playground.render();
    requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}
