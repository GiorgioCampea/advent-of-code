const directions = [
  [0, 1],
  [1, 0],
  [1, 1],
  [1, -1],
  [0, -1],
  [-1, 0],
  [-1, -1],
  [-1, 1],
];

const checkWord = (x, y, dx, dy, grid, word, rows, cols) => {
  for (let i = 0; i < word.length; i++) {
    const nx = x + i * dx;
    const ny = y + i * dy;
    if (
      nx < 0 ||
      ny < 0 ||
      nx >= rows ||
      ny >= cols ||
      grid[ny][nx] !== word[i]
    ) {
      return false;
    }
  }
  return true;
};
export const part1 = ({ input }) => {
  let count = 0;
  const word = "XMAS";

  for (let x = 0; x < input.length; x++) {
    for (let y = 0; y < input[x].length; y++) {
      for (const [dx, dy] of directions) {
        if (
          checkWord(x, y, dx, dy, input, word, input.length, input[x].length)
        ) {
          count++;
        }
      }
    }
  }
  return count;
};

export const part2 = ({ input }) => {
  let count = 0;
  for (let x = 1; x < input.length - 1; x++) {
    for (let y = 1; y < input[x].length - 1; y++) {
      if (input[x][y] === "A") {
        const tlbr =
          (input[x - 1][y - 1] === "M" && input[x + 1][y + 1] === "S") ||
          (input[x - 1][y - 1] === "S" && input[x + 1][y + 1] === "M");
        const trbl =
          (input[x - 1][y + 1] === "M" && input[x + 1][y - 1] === "S") ||
          (input[x - 1][y + 1] === "S" && input[x + 1][y - 1] === "M");
        if (tlbr && trbl) {
          count++;
        }
      }
    }
  }
  return count;
};
