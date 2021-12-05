const R = require("ramda");
const report = require("./report");

const countOccurrences = R.reduce(
  (acc, value) =>
    acc.map((counter, idx) =>
      Array.from(value, Number)[idx] ? R.inc(counter) : R.dec(counter)
    ),
  Array(12).fill(0)
);

const gammaMapper = (v) => (Math.sign(v) === -1 ? 0 : 1);
const epsilonMapper = (v) => (Math.sign(v) === -1 ? 1 : 0);

const countToBinaries = (counts) => [
  R.map(gammaMapper)(counts),
  R.map(epsilonMapper)(counts),
];

const [gamma, epsilon] = R.compose(
  R.map(R.compose((b) => parseInt(b, 2), R.join(""))),
  countToBinaries,
  countOccurrences
)(report);

console.log(gamma * epsilon);
