const combinations = {
  X: {
    value: 1,
    win: "C",
    draw: "A",
  },
  Y: {
    value: 2,
    win: "A",
    draw: "B",
  },
  Z: {
    value: 3,
    win: "B",
    draw: "C",
  },
};
const part2Combinations = {
  A: {
    X: 3,
    Y: 4,
    Z: 8,
  },
  B: {
    X: 1,
    Y: 5,
    Z: 9,
  },
  C: {
    X: 2,
    Y: 6,
    Z: 7,
  }
};

export const part1 = ({ input }) =>
  input.reduce((sum, curr) => {
    if (!curr) {
      return sum;
    }
    const [opponent, you] = curr.split(" ");
    console.log;
    const matchValue =
      combinations[you].value +
      (combinations[you].win === opponent ? 6 : 0) +
      (combinations[you].draw === opponent ? 3 : 0);
    return sum + matchValue;
  }, 0);

export const part2 = ({ input }) =>
  input.reduce((sum, curr) => {
    if (!curr) {
      return sum;
    }
    const [opponent, you] = curr.split(" ");
    const matchValue = part2Combinations[opponent][you];
    return sum + matchValue;
  }, 0);
