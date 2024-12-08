const prepareData = (input) =>
  input.map((element) => element.split("").map((x) => ({ val: x, anti: 0 })));

const findAllNetworks = (map) => {
  const networks = [];
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
      const curr = map[row][col];
      if (curr.val !== ".") {
        const existingNetwork = networks.find((x) => x.val === curr.val);
        if (existingNetwork) {
          existingNetwork.antennas.push({ row, col });
        } else {
          networks.push({ val: curr.val, antennas: [{ row, col }] });
        }
      }
    }
  }
  return networks;
};

const findAntiNodes = (map, networks) => {
  for (const network of networks) {
    for (let i = 0; i < network.antennas.length; i++) {
      for (let j = 0; j < network.antennas.length; j++) {
        if (i !== j) {
          const newRow = 2 * network.antennas[i].row - network.antennas[j].row;
          const newCol = 2 * network.antennas[i].col - network.antennas[j].col;
          if (
            !(
              newRow < 0 ||
              newRow >= map.length ||
              newCol < 0 ||
              newCol >= map[0].length
            )
          ) {
            map[newRow][newCol].anti++;
          }
        }
      }
    }
  }
};

const findAntiNodes2 = (map, networks) => {
  for (const network of networks) {
    for (let i = 0; i < network.antennas.length; i++) {
      for (let j = 0; j < network.antennas.length; j++) {
        if (i !== j) {
          const rowDiff = network.antennas[i].row - network.antennas[j].row;
          const colDiff = network.antennas[i].col - network.antennas[j].col;

          let insideMap = true;
          let newRow = network.antennas[i].row;
          let newCol = network.antennas[i].col;
          while (insideMap) {
            newRow += rowDiff;
            newCol += colDiff;

            if (
              newRow >= 0 &&
              newRow < map.length &&
              newCol >= 0 &&
              newCol < map[0].length
            ) {
              map[newRow][newCol].anti++;
            } else {
              insideMap = false;
            }
          }
        }
      }
    }
  }
};

export const part1 = ({ input }) => {
  const data = prepareData(input);
  const networks = findAllNetworks(data);
  findAntiNodes(data, networks);
  return data.reduce(
    (sum, line) => sum + line.filter((pos) => pos.anti > 0).length,
    0
  );
};

export const part2 = ({ input }) => {
  const data = prepareData(input);
  const networks = findAllNetworks(data);
  findAntiNodes2(data, networks);
  return data.reduce(
    (sum, line) =>
      sum + line.filter((pos) => pos.anti > 0 || pos.val !== ".").length,
    0
  );
};
