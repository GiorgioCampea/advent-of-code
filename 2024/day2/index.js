const isValid = (elements) => {
  let isAsc;
  let isValid = true;
  for (let i = 0; i < elements.length - 1 && isValid; i++) {
    if (i === 0) {
      isAsc = elements[i + 1] - elements[i] > 0;
    }
    isValid =
      isValid &&
      Math.abs(elements[i + 1] - elements[i]) > 0 &&
      Math.abs(elements[i + 1] - elements[i]) < 4 &&
      (isAsc
        ? elements[i + 1] - elements[i] > 0
        : elements[i + 1] - elements[i] < 0);
  }
  return isValid;
};

export const part1 = ({ input }) => {
  return input.filter((row) => {
    const elements = row.split(" ");
    return isValid(elements);
  }).length;
};

export const part2 = ({ input }) => {
  return input.filter((row, index) => {
    const elements = row.split(" ");
    return (
      isValid(elements) ||
      elements.some((element, index) => isValid(elements.toSpliced(index, 1)))
    );
  }).length;
};
