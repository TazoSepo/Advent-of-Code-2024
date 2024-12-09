const fs = require("fs");
const filePath = "./input.txt";

const regexGeneral = /mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/g;
const regexLocal = /mul\((\d+),(\d+)\)/;

function readFileAsString(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function extractCleanedMatches(data) {
  const matches = data.match(regexGeneral) || [];
  let readingEnabled = true;

  return matches.filter((match) => {
    if (match === "don't()") {
      readingEnabled = false;
      return false;
    }
    if (match === "do()") {
      readingEnabled = true;
      return false;
    }
    return readingEnabled && match.includes("mul");
  });
}

function calculateSum(cleanedMatches) {
  return cleanedMatches.reduce((sum, item) => {
    const match = item.match(regexLocal);
    if (match) {
      const num1 = Number(match[1]);
      const num2 = Number(match[2]);
      return sum + num1 * num2;
    }
    return sum;
  }, 0);
}

function solution() {
  const data = readFileAsString(filePath);
  const cleanedMatches = extractCleanedMatches(data);
  return calculateSum(cleanedMatches);
}

console.log(solution());
