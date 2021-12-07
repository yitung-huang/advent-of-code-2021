const input = require('./input.js');

const measurements = input
    .split(`\n`)
    .map((measurement) => parseInt(measurement));

const threeMeasurements = measurements.reduce(
    (measurementArray, curMeasurement, curIndex) => {
        if (curIndex < measurements.length - 2) {
            measurementArray.push(
                curMeasurement +
                    measurements[curIndex + 1] +
                    measurements[curIndex + 2]
            );
        }
        return measurementArray;
    },
    []
);

const numIncreases = threeMeasurements.reduce(
    (sum, curMeasurement, curIndex) => {
        // Skip first measurement because there is no previous value to compare
        if (curIndex === 0) {
            return 0;
        }

        if (curMeasurement > threeMeasurements[curIndex - 1]) {
            return sum + 1;
        }

        return sum;
    },
    0
);

console.log(numIncreases);
