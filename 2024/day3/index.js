export const part1 = ({ input }) => {
  const regexp = /mul\((\d*?,\d*?)\)/g;
  let sum = 0;
  for (const row of input) {
    let match;
    while ((match = regexp.exec(row)) !== null) {
      const [a, b] = match[1].split(",");
      sum += +a * +b;
    }
  }
  return sum;
};

export const part2 = ({ input }) => {
  const regex = /do\(\)|don't\(\)|mul\((\d{1,3}),(\d{1,3})\)/g
  let sum = 0;
  let enabled = true
  let match

  while ((match = regex.exec(input)) !== null) {
      if (match[0] === "do()") enabled = true
      else if (match[0] === "don't()") enabled = false
      else if (enabled) sum += parseInt(match[1]) * parseInt(match[2])
  }
  return sum;
};
