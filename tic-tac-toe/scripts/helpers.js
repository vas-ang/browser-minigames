export function hasWinner(matrix) {
  const horizontally = matrix.some((x) => x.every((y) => y === x[0] && x[0]));
  const vertically = matrix
    .map((x, i) => x.map((_, j) => matrix[j][i]))
    .some((x) => x.every((y) => y === x[0] && x[0]));
  const diagonallyLeft = matrix.every(
    (x, i) => x[i] === matrix[0][0] && matrix[0][0]
  );
  const diagonallyRight = matrix.every(
    (x, i) =>
      x[x.length - i - 1] === matrix[0][x.length - 1] && matrix[0][x.length - 1]
  );
  return horizontally || vertically || diagonallyLeft || diagonallyRight;
}

export function canvasToMatrix(canvas, colsPerRow) {
  return Array.from(canvas.children).reduce((acc, cur, i) => {
    const row = Math.floor(i / colsPerRow);
    const col = Math.floor(i % colsPerRow);

    if (typeof acc[row] === "undefined") {
      acc[row] = [];
    }

    acc[row][col] = cur.textContent;
    return acc;
  }, []);
}

export function getEmptyFields(matrix) {
  return matrix.reduce((acc, cur, row) => {
    cur.map((x, col) => {
      if (!x) {
        acc.push([row, col]);
      }
    });

    return acc;
  }, []);
}

function deepAssign(target, obj) {
  Object.entries(obj).map(function ([key, value]) {
    if (typeof value === "object") {
      deepAssign(target[key], value);
    }

    try {
      const o = {};
      o[key] = value;
      Object.assign(target, o);
    } catch {
      Object.defineProperty(target, key, {
        value: value,
      });
    }
  });
}

export function el(type, text, properties) {
  const el = document.createElement(type);

  el.textContent = text;
  deepAssign(el, properties);

  return el;
}
