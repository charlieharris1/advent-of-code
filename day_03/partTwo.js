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
  R.reduce((acc, value) => (value[idx] ? R.inc(acc) : R.dec(acc)), 0);

const recurse = (occurrenceCounter) => (idx, acc) => {
  if (R.length(acc) === 1) return acc;
  const mostCommonNum = R.compose(occurrenceCounter, countOccurrences(idx))(acc);

  return recurse(occurrenceCounter)(
    idx + 1,
    R.filter((value) => value[idx] === mostCommonNum)(acc)
  );
};

const transformedReport = R.map((r) => Array.from(r, Number))(report);

const [most] = recurse((v) => (Math.sign(v) === -1 ? 0 : 1))(
  0,
  transformedReport
);
const [least] = recurse((v) => (Math.sign(v) === -1 ? 1 : 0))(
  0,
  transformedReport
);

console.log(parseInt(R.join("")(most), 2) * parseInt(R.join("")(least), 2));
