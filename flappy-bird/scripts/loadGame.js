import { Playground } from "./entitites/playground.js";
import { Bird } from "./entitites/bird.js";
import { Ground } from "./entitites/ground.js";
import { Decoration } from "./entitites/decoration.js";
import { Score } from "./entitites/score.js";
import { Button } from "./entitites/button.js";
import startGame from "./startGame.js";

async function loadGameSettings() {
  return await (await fetch("../gameSettings.json")).json();
}

async function loadAsImageBitmap(path) {
  return await createImageBitmap(await (await fetch(path)).blob());
}

async function loadImages(
  birdSpritePath,
  groundImagePath,
  backgroundPath,
  playButtonPath,
  pipeTopPath,
  pipeMiddlePath,
  pipeBodyPath
) {
  const birdSprite = await loadAsImageBitmap(birdSpritePath);
  const groundImage = await loadAsImageBitmap(groundImagePath);
  const background = await loadAsImageBitmap(backgroundPath);
  const pipeTop = await loadAsImageBitmap(pipeTopPath);
  const pipeMiddle = await loadAsImageBitmap(pipeMiddlePath);
  const pipeBody = await loadAsImageBitmap(pipeBodyPath);
  const playButton = await loadAsImageBitmap(playButtonPath);

  return {
    birdSprite,
    groundImage,
    background,
    pipeTop,
    pipeMiddle,
    pipeBody,
    playButton,
  };
}

export default async function loadGame() {
  const gameSettings = await loadGameSettings();
  const images = await loadImages(
    gameSettings.birdSpritePath,
    gameSettings.groundImagePath,
    gameSettings.backgroundImagePath,
    gameSettings.playButtonPath,
    gameSettings.pipeImages.top,
    gameSettings.pipeImages.transition,
    gameSettings.pipeImages.body
  );

  const playground = new Playground(
      gameSettings.canvasWidth,
      gameSettings.canvasHeight,
      gameSettings.backgroundColor
    ),
    ground = new Ground(
      gameSettings.canvasBeginningX,
      gameSettings.canvasHeight - images.groundImage.height,
      images.groundImage
    ),
    city = new Decoration(
      gameSettings.canvasBeginningX,
      gameSettings.canvasHeight -
        images.groundImage.height -
        images.background.height,
      images.background
    ),
    player = new Bird(
      gameSettings.playerX,
      gameSettings.playerY,
      gameSettings.playerWidth,
      gameSettings.playerHeight,
      gameSettings.gravity,
      images.birdSprite,
      gameSettings.framesPerImage
    ),
    score = new Score(
      gameSettings.initialScoreValue,
      gameSettings.scoreOuterColor,
      gameSettings.scoreInnerColor,
      gameSettings.scoreFontSize,
      gameSettings.scoreFontFamily
    ),
    button = new Button(
      (gameSettings.canvasWidth - images.playButton.width) / 2,
      (gameSettings.canvasHeight - images.playButton.height) / 2,
      images.playButton,
      playground.canvas
    ),
    pipes = new Array();

  button.addClickEvent(function (func) {
    startGame(
      playground,
      button,
      score,
      player,
      gameSettings,
      ground,
      images,
      pipes
    );
    button.removeClickEvent(func);
  });

  playground.addDrawElement(city);
  playground.addDrawElement(pipes);
  playground.addDrawElement(ground);
  playground.addDrawElement(player);
  playground.addDrawElement(button);

  playground.render();

  document.body.insertBefore(playground.canvas, document.body.children[0]);
}
