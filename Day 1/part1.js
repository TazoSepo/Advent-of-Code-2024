const fs = require("fs");
const filePath = "./input.txt";

function parseFile(filePath) {
  const data = fs.readFileSync(filePath, "utf8").trim();
  const [list1, list2] = data.split("\n").reduce(
    ([l1, l2], row) => {
      const [value1, value2] = row.trim().split(/\s+/).map(Number);
      return [
        [...l1, value1],
        [...l2, value2],
      ];
    },
    [[], []]
  );

  return [list1.sort((a, b) => a - b), list2.sort((a, b) => a - b)];
}

function calculateMinimumDifferenceSum(list1, list2) {
  return list1.reduce(
    (sum, value, index) => sum + Math.abs(value - list2[index]),
    0
  );
}

function solution() {
  const [list1, list2] = parseFile(filePath);
  return calculateMinimumDifferenceSum(list1, list2);
}

console.log(solution());
