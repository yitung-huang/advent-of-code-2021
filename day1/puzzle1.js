const input = require('./input.js');

const measurements = input
    .split(`\n`)
    .map((measurement) => parseInt(measurement));

const numIncreases = measurements.reduce((sum, curMeasurement, curIndex) => {
    // Skip first measurement because there is no previous value to compare
    if (curIndex === 0) {
        return 0;
    }

    if (curMeasurement > measurements[curIndex - 1]) {
        return sum + 1;
    }

    return sum;
}, 0);

console.log(numIncreases);
