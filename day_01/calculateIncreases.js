const R = require("ramda");
const depthMeasurements = require("./depthMeasurements");

const { true: partOneResult } = R.compose(
  R.countBy(([prev, curr]) => curr > prev),
  R.aperture(2)
)(depthMeasurements);

console.log("Part one: ", partOneResult);

const { true: partTwoResult } = R.compose(
  R.countBy(([prev, curr]) => curr > prev),
  R.aperture(2),
  R.map(R.sum),
  R.aperture(3)
)(depthMeasurements);

console.log("Part two: ", partTwoResult);
