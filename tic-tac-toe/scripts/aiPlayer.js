import { hasWinner, getEmptyFields } from "./helpers.js";

function evaluatePath(move) {
  if (Array.isArray(move.outcomes)) {
    const outcomes = move.outcomes.map((o) => evaluatePath(o));

    const predicate =
      move.player === move.currentPlayer
        ? (a, b) => b.rating - a.rating
        : (a, b) => a.rating - b.rating;

    const optimalOutcome = outcomes.sort(predicate).find((x) => x);

    return { rating: optimalOutcome.rating, move: move.move };
  }

  return move.outcomes;
}

function evaluateOutcome(boardState, player, currentPlayer, move) {
  const modifiedBoardState = new Array(
    ...boardState.map((x) => new Array(...x))
  );

  modifiedBoardState[move[0]][move[1]] = currentPlayer.toLocaleUpperCase();

  const emptyFields = getEmptyFields(modifiedBoardState);

  if (!hasWinner(modifiedBoardState)) {
    if (emptyFields.length === 0) {
      return {
        rating: 0,
        move,
      };
    }

    const nextPlayer = currentPlayer === "x" ? "o" : "x";

    const possibleMoves = emptyFields.map((x) => {
      return {
        move,
        player,
        currentPlayer: currentPlayer,
        outcomes: evaluateOutcome(modifiedBoardState, player, nextPlayer, x),
      };
    });

    return possibleMoves;
  }

  let endState;

  if (player === currentPlayer) {
    endState = 1;
  } else {
    endState = -1;
  }

  return {
    rating: endState,
    move,
  };
}

const difficultyMap = {
  easy: (moves) => {
    let index = 0;

    if (Math.round(Math.random() * 100) <= 40) {
      index = 1;
    }

    return moves.sort((a, b) => b.rating - a.rating)[index];
  },
  medium: (moves) => {
    let index = 0;

    if (Math.round(Math.random() * 100) <= 25) {
      index = 1;
    }

    return moves.sort((a, b) => b.rating - a.rating)[index];
  },
  hard: (moves) => {
    let index = 0;

    if (Math.ceil(Math.random() * 100) <= 15) {
      index = 1;
    }

    return moves.sort((a, b) => b.rating - a.rating)[index];
  },
  impossible: (moves) => moves.sort((a, b) => b.rating - a.rating)[0],
};

export function chooseMove(boardState, player, difficulty) {
  const emptyFields = getEmptyFields(boardState);
  if (emptyFields.length === boardState.flat(2).length) {
    return [
      Math.floor(Math.random() * boardState.length),
      Math.floor(Math.random() * boardState[0].length),
    ];
  }

  const evaluatedOutcomes = emptyFields.map((x) => {
    return {
      move: x,
      player,
      currentPlayer: player === "x" ? "o" : "x",
      outcomes: evaluateOutcome(boardState, player, player, x),
    };
  });

  const possibleMoves = evaluatedOutcomes.map(evaluatePath);

  return difficultyMap[difficulty](possibleMoves).move;
}
