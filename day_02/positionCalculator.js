const R = require("ramda");
const course = require("./course");

const calculatePos = (pos) => ({
  forward: (v) => ({ ...pos, horizontal: pos.horizontal + v }),
  up: (v) => ({ ...pos, depth: pos.depth - v }),
  down: (v) => ({ ...pos, depth: pos.depth + v }),
});

const { horizontal, depth } = R.reduce(
  (acc, [command, value]) => calculatePos(acc)[command](value),
  { horizontal: 0, depth: 0 }
)(course);

console.log(horizontal * depth);
