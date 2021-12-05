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

const recurse = (idx, acc) => {
  if (R.length(acc.most) === 1)
  if (idx < 3) {
    const { most: mostOccurrences, least: leastOccurrences } = R.mapObjIndexed(
      (rows, key) => {
        const mapper =
          key === "most"
            ? (v) => (Math.sign(v) === -1 ? 0 : 1)
            : (v) => (Math.sign(v) === -1 ? 1 : 0);

        return R.compose(mapper, countOccurrences(idx))(rows);
      }
    )(acc);

    return recurse(idx + 1, {
      most: R.filter((row) => Array.from(row, Number)[idx] === mostOccurrences)(
        acc.most
      ),
      least: R.filter(
        (row) => Array.from(row, Number)[idx] === leastOccurrences
      )(acc.least),
    });
  }

  return acc;
};

console.log(recurse(0, { most: report, least: report }));
// Most common: [ 1, 0, 1, 1, 0 ]
// Least common: [ 0, 1, 0, 0, 1 ]
