import { renderMainMenu, renderGame } from "./uiRendering.js";
import { hasWinner, canvasToMatrix, el, getEmptyFields } from "./helpers.js";
import { chooseMove } from "./aiPlayer.js";

window.addEventListener("load", function () {
  const main = document.getElementById("main");

  renderMainMenu(main);

  const gameSettings = {
    AI: false,
    player: "x",
    difficulty: "medium",
  };

  let currentPlayer = "x";

  function aiPlay(board) {
    const [row, col] = chooseMove(canvasToMatrix(board, 3), currentPlayer, gameSettings.difficulty);
    const el = board.querySelector(`div:nth-child(${row * 3 + col + 1})`);
    play(el);
  }

  function reload() {
    renderGame(main, gameSettings);
    actionMap.play = play;
    currentPlayer = "x";

    if (gameSettings.AI && gameSettings.player !== currentPlayer) {
      aiPlay(document.getElementById("board"));
    }
  }

  function play(tg) {
    tg.textContent = currentPlayer.toLocaleUpperCase();
    tg.classList.add(currentPlayer);
    delete tg.dataset.action;

    if (hasWinner(canvasToMatrix(tg.parentElement, 3))) {
      document.getElementById(
        "info"
      ).innerHTML = `<div id="currentTurnElement">${currentPlayer.toLocaleUpperCase()}</div> is winner!`;
      actionMap.play = undefined;
      document
        .getElementById("menu")
        .appendChild(
          el("button", "Play again!", { dataset: { action: "reload" } })
        );
      return;
    }

    if (getEmptyFields(canvasToMatrix(tg.parentElement, 3)).length === 0) {
      document.getElementById("info").innerHTML = "There is no winner :(";
      actionMap.play = undefined;
      document
        .getElementById("menu")
        .appendChild(
          el("button", "Play again!", { dataset: { action: "reload" } })
        );
      return;
    }

    currentPlayer = currentPlayer === "x" ? "o" : "x";
    document.getElementById(
      "currentTurnElement"
    ).textContent = currentPlayer.toLocaleUpperCase();

    if (gameSettings.AI && gameSettings.player !== currentPlayer) {
      aiPlay(tg.parentElement);
    }
  }

  const actionMap = {
    setGamemode: function (tg) {
      gameSettings.AI = tg.dataset.gamemode === "bot";
      reload();
    },
    setPlayer: function (tg) {
      gameSettings.player = tg.dataset.player;
      reload();
    },
    setDifficulty: function (tg) {
      gameSettings.difficulty = tg.dataset.difficulty;
      reload();
    },
    home: function () {
      renderMainMenu(main);
    },
    reload: reload,
  };

  main.addEventListener("click", function (e) {
    const dataAction = e.target.dataset.action;
    const action = actionMap[dataAction];

    if (typeof action === "function") {
      action.call(e.target, e.target);
    }
  });
});
