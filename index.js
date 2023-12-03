import { fileExists, argsChecker, loadData, partRunner } from "./utils/helper.js";

const args = process.argv.slice(2);

const { dataType } = await argsChecker(args);

const [year, day] = args;

const dayFile = `day${day}`;

const filePath = `./${year}/${dayFile}/index.js`;

if (!(await fileExists(filePath))) {
    console.log(`Day ${args[0]} does not exist`);
    process.exit(1);
}

const { part1, part2 } = await import(filePath);
const data = await loadData({ year: year, day: dayFile, dataType });

await partRunner({ part: part1, input: data });

if (dataType === "sample" && (await fileExists(`./${year}/${dayFile}/sample2.txt`))) {
    await partRunner({ part: part2, input: await loadData({ day: dayFile, dataType: "sample2" }) });
} else {
    await partRunner({ part: part2, input: data });
}