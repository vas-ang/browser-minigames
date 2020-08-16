const templates = {
  mainMenu: `<h3 id="info">Select gamemode:</h3>
  <div id="gameConfig" class="buttonContainer">
    <button data-action="setGamemode" data-gamemode="bot">
      Play with the computer
    </button>
    <button data-action="setGamemode" data-gamemode="two-players">
      Play with a friend
    </button>`,
  botControll: `<div id="botControll">
  <div class="buttonContainer">
    <h3>Player:</h3>
    <button data-action="setPlayer" data-player="x">X</button>
    <button data-action="setPlayer" data-player="o">O</button>
  </div>
  <div class="buttonContainer">
    <h3>Difficulty:</h3>
    <button data-action="setDifficulty" data-difficulty="easy">Easy</button>
    <button data-action="setDifficulty" data-difficulty="medium">Medium</button>
    <button data-action="setDifficulty" data-difficulty="hard">Hard</button>
    <button data-action="setDifficulty" data-difficulty="impossible">Impossible</button>
  </div>
</div>`,
  mainGame: `<h3 id="info">It's <div id="currentTurnElement">X</div>'s turn.</h3>
<div id="board">
  <div data-action="play" class="box"></div>
  <div data-action="play" class="box"></div>
  <div data-action="play" class="box"></div>
  <div data-action="play" class="box"></div>
  <div data-action="play" class="box"></div>
  <div data-action="play" class="box"></div>
  <div data-action="play" class="box"></div>
  <div data-action="play" class="box"></div>
  <div data-action="play" class="box"></div>
</div>
<div id="menu" class="buttonContainer">
  <button data-action="home">Home page</button>
</div>`,
};

export function renderMainMenu(main) {
  main.innerHTML = templates.mainMenu;
}

export function renderGame(main, gameSettings) {
  main.innerHTML = gameSettings.AI
    ? `${templates.botControll}${templates.mainGame}`
    : templates.mainGame;

  if (gameSettings.AI) {
    main
      .querySelector(`button[data-player=${gameSettings.player}]`)
      .classList.add("selected");
    main
      .querySelector(`button[data-difficulty=${gameSettings.difficulty}]`)
      .classList.add("selected");
  }
}
