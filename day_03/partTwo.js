const R = require("ramda");
// const report = require("./report");

const report = [
  "00100",
  "11110",
  "10110",
  "10111",
  "10101",
  "01111",
  "00111",
  "11100",
  "10000",
  "11001",
  "00010",
  "01010",
];

const countOccurrences = (idx) =>
  R.reduce(
    (acc, value) => (Array.from(value, Number)[idx] ? R.inc(acc) : R.dec(acc)),
    0
  );

const recurse = (occurrenceCounter) => (idx, acc) => {
  if (R.length(acc) === 1) return acc;
  const occurrences = R.compose(occurrenceCounter, countOccurrences(idx))(acc);

  return recurse(occurrenceCounter)(
    idx + 1,
    R.filter((row) => Array.from(row, Number)[idx] === occurrences)(acc)
  );
};

const most = recurse((v) => (Math.sign(v) === -1 ? 0 : 1))(0, report);
const least = recurse((v) => (Math.sign(v) === -1 ? 1 : 0))(0, report);

console.log(parseInt(most, 2) * parseInt(least, 2))
// Most common: [ 1, 0, 1, 1, 0 ]
// Least common: [ 0, 1, 0, 0, 1 ]
