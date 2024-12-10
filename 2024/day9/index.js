const prepareData = (line) => {
  const data = [];
  const lineSplitted = line.split("");
  let id = 0;
  for (let i = 0; i < lineSplitted.length; i++) {
    for (let j = 0; j < parseInt(lineSplitted[i]); j++) {
      data.push(i % 2 == 0 ? id : ".");
    }
    if (i % 2 == 0) id++;
  }
  return data;
};

export const part1 = ({ input }) => {
  const data = prepareData(input[0]);
  let lastIndex = data.length - 1;
  for (let index = 0; index < data.length - 1; index++) {
    if (data[index] !== ".") {
      continue;
    }
    for (let innerIndex = lastIndex; innerIndex > index; innerIndex--) {
      if (data[innerIndex] === ".") {
        continue;
      }
      data[index] = data[innerIndex];
      data[innerIndex] = ".";
      lastIndex = innerIndex;
      break;
    }
  }
  return data.reduce((sum, value, index) => sum + (value === "." ? 0 : index * value), 0);
};

export const part2 = ({ input }) => {
  let id = 0;
  const data = input[0].split('').map((el, index) => {
    const result = [];
    for (let j = 0; j < parseInt(el); j++) {
      result.push(index % 2 == 0 ? id : '.');
    }
    if (index % 2 == 0) id++;
    return result;
  });
  const newMap = data.flat();
  for (let i = data.length - 1; i >= 0; i--) {
    if (data[i].every((x) => x == null)) continue;

    const mapIndex = newMap.indexOf(data[i][0]);
    const firstPoint = newMap.findIndex(
      (x, j) =>
        x === '.' &&
        j < mapIndex &&
        newMap.slice(j, j + data[i].length).every((x) => x === '.')
    );
    if (firstPoint == -1) continue;
    if (
      !newMap
        .slice(firstPoint, firstPoint + data[i].length)
        .every((x) => x === '.')
    )
      continue;

    newMap.splice(firstPoint, data[i].length, ...data[i]);
    newMap.splice(mapIndex, data[i].length, ...Array(data[i].length).fill('.'));
  }
  return newMap.reduce((a, x, i) => a + (x === "." ? 0 : i * x), 0);
};
