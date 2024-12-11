const DIRECTIONS = [
  [-1, 0], // UP
  [0, 1], // RIGHT
  [1, 0], // DOWN
  [0, -1], // LEFT
];

const isValid = (x, y, rows, cols) => x >= 0 && x < rows && y >= 0 && y < cols;

const bfs = (startR, startC, grid) => {
  const rows = grid.length;
  const cols = grid[0].length;
  const visited = new Set();
  const reachable9s = new Set();
  const queue = [[startR, startC]];
  visited.add(`${startR},${startC}`);

  while (queue.length > 0) {
    const [r, c] = queue.shift();
    const currentHeight = parseInt(grid[r][c]);

    if (currentHeight === 9) {
      reachable9s.add(`${r},${c}`);
    }

    for (const [dr, dc] of DIRECTIONS) {
      const newR = r + dr;
      const newC = c + dc;

      if (!isValid(newR, newC, rows, cols)) continue;

      const newHeight = parseInt(grid[newR][newC]);
      const key = `${newR},${newC}`;

      if (!visited.has(key) && newHeight === currentHeight + 1) {
        visited.add(key);
        queue.push([newR, newC]);
      }
    }
  }

  return reachable9s.size;
};

const dfs = (r, c, grid, visited = new Set()) => {
  const rows = grid.length;
  const cols = grid[0].length;
  const currentHeight = parseInt(grid[r][c]);

  if (currentHeight === 9) {
    return 1;
  }

  let paths = 0;
  const currentPos = `${r},${c}`;
  visited.add(currentPos);

  return DIRECTIONS.reduce((prev, [dr, dc]) => {
    const newR = r + dr;
    const newC = c + dc;
    const newPos = `${newR},${newC}`;

    if (!isValid(newR, newC, rows, cols)) {
      return prev;
    }

    const newHeight = parseInt(grid[newR][newC]);

    if (newHeight === currentHeight + 1 && !visited.has(newPos)) {
      return prev + dfs(newR, newC, grid, new Set(visited));
    }
    return prev;
  }, 0);
};

export const part1 = ({ input }) =>
  input.reduce(
    (prev, curr, index) =>
      prev +
      curr
        .trim()
        .split('')
        .reduce((innerPrev, innerCurr, innerIndex) => {
          let rating = 0;
          if (innerCurr === '0') {
            rating = bfs(index, innerIndex, input);
          }
          return (innerPrev += rating);
        }, 0),
    0
  );

export const part2 = ({ input }) =>
  input.reduce(
    (prev, curr, index) =>
      prev +
      curr
        .trim()
        .split('')
        .reduce((innerPrev, innerCurr, innerIndex) => {
          let rating = 0;
          if (innerCurr === '0') {
            rating = dfs(index, innerIndex, input);
          }
          return (innerPrev += rating);
        }, 0),
    0
  );
