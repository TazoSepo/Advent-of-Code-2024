const fs = require("fs");
const filePath = "./input.txt";

const regexGeneral = /mul\(\d{1,3},\d{1,3}\)/g;
const regexLocal = /mul\((\d+),(\d+)\)/;

const readFileAsString = (filePath) => fs.readFileSync(filePath, "utf8");

const calculateSum = (data) => {
  const matches = data.match(regexGeneral) || [];
  return matches.reduce((sum, match) => {
    const [, num1, num2] = match.match(regexLocal) || [];
    return sum + (Number(num1) * Number(num2) || 0);
  }, 0);
};

const solution = () => {
  const data = readFileAsString(filePath);
  return calculateSum(data);
};

console.log(solution());
