const operators = ["+", "*"];

const evaluateExpression = (numbers, operators) => {
  let result = numbers[0];
  for (let i = 0; i < operators.length; i++) {
    if (operators[i] === "+") {
      result += numbers[i + 1];
    } else if (operators[i] === "*") {
      result *= numbers[i + 1];
    } else if (operators[i] === "||") {
      result = parseInt(`${result}${numbers[i + 1]}`);
    }
  }
  return result;
};

const generateOperatorCombinations = (length, operators) => {
  const combinations = [];

  function generate(current) {
    if (current.length === length) {
      combinations.push([...current]);
      return;
    }
    for (let op of operators) {
      current.push(op);
      generate(current);
      current.pop();
    }
  }

  generate([]);
  return combinations;
};

const processRow = (row, operators) => {
  if (!row) {
    return 0;
  }
  const [result, valueString] = row.split(": ");
  const values = valueString.split(" ").map(Number);
  const operatorCombinations = generateOperatorCombinations(values.length - 1, operators);

  return operatorCombinations.some(
    (operators) => evaluateExpression(values, operators) === +result
  )
    ? +result
    : 0;
};

export const part1 = ({ input }) => {
  return input.reduce((sum, row) => sum + processRow(row, operators), 0);
};

export const part2 = ({ input }) => {
  const completeOperators = [...operators, '||']
  return input.reduce((sum, row) => sum + processRow(row, completeOperators), 0);
};
