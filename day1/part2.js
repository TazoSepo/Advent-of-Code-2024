const fs = require("fs");
const filePath = "./input.txt";

function parseFile(filePath) {
  const data = fs.readFileSync(filePath, "utf8").trim();
  return data.split("\n").reduce(
    ([l1, l2], row) => {
      const [value1, value2] = row.trim().split(/\s+/).map(Number);
      return [
        [...l1, value1],
        [...l2, value2],
      ];
    },
    [[], []]
  );
}

function calculateSimilarityScore(list1, list2) {
  const frequencyMap = new Map();

  list2.forEach((num) => {
    frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
  });

  return list1.reduce((score, num) => {
    return score + (frequencyMap.get(num) || 0) * num;
  }, 0);
}

function solution() {
  const [list1, list2] = parseFile(filePath);
  return calculateSimilarityScore(list1, list2);
}

console.log(solution());
