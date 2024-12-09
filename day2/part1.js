const fs = require("fs");
const filePath = "./input.txt";
const allowedDiff = new Set([1, 2, 3]);

function readFileAsMatrix(filePath) {
  return fs
    .readFileSync(filePath, "utf8")
    .trim()
    .split("\n")
    .map((line) => line.trim().split(/\s+/).map(Number));
}

function isDifferenceAllowed(diff) {
  return allowedDiff.has(Math.abs(diff));
}

function isRowSafe(row) {
  const isIncreasing = row[0] < row[1];

  for (let i = 0; i < row.length - 1; i++) {
    const diff = row[i] - row[i + 1];

    if (!isDifferenceAllowed(diff) || diff < 0 !== isIncreasing) {
      return false;
    }
  }

  return true;
}

function calculateSafeReports(matrix) {
  return matrix.filter(isRowSafe).length;
}

function solution() {
  const matrix = readFileAsMatrix(filePath);
  return calculateSafeReports(matrix);
}

console.log(solution());
