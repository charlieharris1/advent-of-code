const R = require("ramda");

const course = require("./course");

const calculatePosPartOne = (pos) => ({
  forward: (v) => ({ ...pos, horizontal: pos.horizontal + v }),
  up: (v) => ({ ...pos, depth: pos.depth - v }),
  down: (v) => ({ ...pos, depth: pos.depth + v }),
});

const calculatePosPartTwo = (pos) => ({
  forward: (v) => ({
    ...pos,
    horizontal: pos.horizontal + v,
    depth: pos.depth + pos.aim * v,
  }),
  up: (v) => ({ ...pos, aim: pos.aim - v }),
  down: (v) => ({ ...pos, aim: pos.aim + v }),
});

const calculate = (calculatePos) =>
  R.reduce((acc, [command, value]) => calculatePos(acc)[command](value), {
    horizontal: 0,
    depth: 0,
    aim: 0,
  })(course);

const partOneResult = calculate(calculatePosPartOne);
console.log(partOneResult.horizontal * partOneResult.depth);

const partTwoResult = calculate(calculatePosPartTwo);
console.log(partTwoResult.horizontal * partTwoResult.depth);
