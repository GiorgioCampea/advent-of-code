const isSymbol = (value) => {
  return value !== undefined && value !== "." && isNaN(+value);
};

const adjacentSpots = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
  [-1, -1],
  [-1, 1],
  [1, -1],
  [1, 1],
];

const findFullNumber = (input, i, j) => {
  let nb = input[i][j];

  for (let k = j - 1; k >= 0; k--) {
    if (Number.isInteger(+input[i][k])) {
      nb = `${input[i][k]}${nb}`;
    } else {
      break;
    }
  }

  for (let k = j + 1; k < input[0].length; k++) {
    if (Number.isInteger(+input[i][k])) {
      nb += input[i][k];
    } else {
      break;
    }
  }

  return nb;
};

const findAdjacentNumbers = (input, i, j) => {
  const adjacentNumbers = new Set();
  for (const [x, y] of adjacentSpots) {
    const value = input[i + y]?.[j + x];
    if (Number.isInteger(+value)) {
      adjacentNumbers.add(findFullNumber(input, i + y, j + x));
    }
  }
  return Array.from(adjacentNumbers);
};

export const part1 = ({ input }) => {
  const numbers = [];
  for (let rowIndex = 0; rowIndex < input.length; rowIndex++) {
    const row = input[rowIndex];
    let numberString = "";
    let isToAdd = false;
    let prevRow;
    let nextRow;
    if (rowIndex > 0) {
      prevRow = input[rowIndex - 1];
    }
    if (rowIndex < input.length) {
      nextRow = input[rowIndex + 1];
    }
    for (let charIndex = 0; charIndex < row.length; charIndex++) {
      if (!isNaN(row[charIndex])) {
        numberString += row[charIndex];
        isToAdd =
          isToAdd ||
          (charIndex > 0 && isSymbol(row[charIndex - 1])) ||
          (charIndex < row.length - 1 && isSymbol(row[charIndex + 1]));
        if (!isToAdd) {
          if (prevRow) {
            isToAdd =
              isToAdd ||
              isSymbol(prevRow[charIndex]) ||
              (charIndex > 0 && isSymbol(prevRow[charIndex - 1])) ||
              (charIndex < row.length - 1 && isSymbol(prevRow[charIndex + 1]));
          }
          if (nextRow) {
            isToAdd =
              isToAdd ||
              isSymbol(nextRow[charIndex]) ||
              (charIndex > 0 && isSymbol(nextRow[charIndex - 1])) ||
              (charIndex < row.length - 1 && isSymbol(nextRow[charIndex + 1]));
          }
        }
      } else {
        if (!isNaN(numberString)) {
          if (+numberString && isToAdd) {
            numbers.push(+numberString);
          }
        }
        numberString = "";
        isToAdd = false;
      }
    }
    if (!isNaN(numberString)) {
      if (+numberString && isToAdd) {
        numbers.push(+numberString);
      }
    }
    numberString = "";
    isToAdd = false;
  }
  return numbers.reduce((prev, curr) => prev + curr, 0);
};

export const part2 = ({ input }) => {
  let solution = 0;
  for (let rowIndex = 0; rowIndex < input.length; rowIndex++) {
    const row = input[rowIndex];
    let numberString = "";
    let isToAdd = false;
    let prevRow;
    let nextRow;
    if (rowIndex > 0) {
      prevRow = input[rowIndex - 1];
    }
    if (rowIndex < input.length) {
      nextRow = input[rowIndex + 1];
    }
    for (let charIndex = 0; charIndex < row.length; charIndex++) {
      if (row[charIndex] === "*") {
        const adjacentNumbers = findAdjacentNumbers(input, rowIndex, charIndex);

        if (adjacentNumbers.length === 2) {
          const [nb1, nb2] = adjacentNumbers;
          solution += +nb1 * +nb2;
        }
      }
    }
  }
  return solution;
};
