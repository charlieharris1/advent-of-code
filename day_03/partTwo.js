const R = require("ramda");
const report = require("./report");

const countOccurrences = (idx) =>
  R.reduce((acc, value) => (value[idx] ? R.inc(acc) : R.dec(acc)), 0);

const filterByBitOccurrence = (occurrenceFn) => (idx) => (acc) => {
  if (R.length(acc) === 1) return acc;
  const num = R.compose(occurrenceFn, countOccurrences(idx))(acc);

  return filterByBitOccurrence(occurrenceFn)(idx + 1)(
    R.filter((value) => value[idx] === num)(acc)
  );
};

const getValue = (occurrenceFn) =>
  R.compose(
    (s) => parseInt(s, 2),
    ([arr]) => arr.join(""),
    filterByBitOccurrence(occurrenceFn)(0),
    R.map((r) => Array.from(r, Number))
  );

const [most, least] = [
  (v) => (Math.sign(v) === -1 ? 0 : 1),
  (v) => (Math.sign(v) === -1 ? 1 : 0),
].map((fn) => getValue(fn)(report));

console.log(most * least);
