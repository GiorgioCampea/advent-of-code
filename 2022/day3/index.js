const prepareValue = () => {
  const values = {};
  for (let i = 97; i < 123; i++) {
    values[String.fromCharCode(i)] = i - 96;
  }
  for (let i = 65; i < 91; i++) {
    values[String.fromCharCode(i)] = i - 38;
  }
  return values;
};

export const part1 = ({ input }) => {
  const values = prepareValue();
  return input
    .map((line) =>
      line
        .slice(0, line.length / 2)
        .split("")
        .find((el) => line.slice(line.length / 2, line.length).includes(el))
    )
    .reduce(
      (acc, curr) => (curr && curr.length ? acc + values[curr[0]] : acc),
      0
    );
};
export const part2 = ({ input }) => {
  const values = prepareValue();
  let sum = 0;
  for (let index = 0; index < input.length - 1; index += 3) {
    const element = input[index]
      .split("")
      .filter((el) => input[index + 1].includes(el))
      .find((el) => input[index + 2].includes(el));
    sum += values[element];
  }
  return sum;
};
