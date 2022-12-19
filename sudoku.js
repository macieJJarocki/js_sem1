let grid =
  // x
  [
    [7, 0, 4, 8, 0, 0, 3, 0, 1],
    [8, 2, 0, 5, 0, 0, 0, 4, 0],
    [0, 0, 9, 4, 3, 0, 5, 0, 0],
    [3, 1, 0, 0, 0, 0, 8, 0, 7],
    [0, 8, 0, 0, 0, 0, 0, 1, 0],
    [9, 0, 7, 0, 0, 0, 0, 3, 2], // y
    [0, 0, 6, 0, 1, 5, 4, 0, 0],
    [0, 7, 0, 0, 0, 9, 0, 6, 5],
    [5, 0, 8, 0, 0, 2, 1, 0, 3],
  ];

function logGrid(grid) {
  return grid.forEach((row) => console.log(row));
}

function isPossible(y, x, num) {
  const vertical = 9;
  const horizontal = 9;

  for (let i = 0; i < horizontal; i++) {
    if (grid[y][i] === num) {
      return false;
    }
  }

  for (let i = 0; i < vertical; i++) {
    if (grid[i][x] === num) {
      return false;
    }
  }

  const x00 = Math.floor(x / 3) * 3;
  const y00 = Math.floor(y / 3) * 3;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[y00 + i][x00 + j] === num) {
        return false;
      }
    }
  }
  return true;
}

function solveSudoku() {
  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++) {
      if (grid[y][x] === 0) {
        for (let n = 1; n < 10; n++) {
          if (isPossible(y, x, n)) {
            grid[y][x] = n;
            logGrid(grid);
            console.log("-----------------------");
            solveSudoku();
            grid[y][x] = 0;
          }
        }
        return;
      }
    }
  }
  logGrid(grid);
}

solveSudoku();
