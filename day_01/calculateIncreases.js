const R = require("ramda");
const depthMeasurements = require("./depthMeasurements");

const { true: result } = R.compose(
  R.countBy(([prev, curr]) => curr > prev),
  R.aperture(2)
)(depthMeasurements);

console.log(result);
