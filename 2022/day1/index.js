export const part1 = ({ input }) => {
  let singleSum = 0;
  const allCalories = [];
  for (const line of input) {
    if (!line) {
      allCalories.push(singleSum);
      singleSum = 0;
    }
    singleSum += +line;
  }
  return allCalories.sort((a, b) => b - a)[0];
};

export const part2 = ({ input }) => {
  return input
    .reduce(
      (acc, curr) => {
        if (curr) {
          acc[acc.length - 1] = acc[acc.length - 1] + +curr;
        } else {
          acc.push(0);
        }
        return acc;
      },
      [0]
    )
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((sum, curr) => sum + curr, 0);
};
