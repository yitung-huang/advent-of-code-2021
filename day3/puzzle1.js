const input = require('./input.js');

const binaryNumbers = input.split('\n');

// Sum up all the bits in each respective index
const sums = binaryNumbers.reduce((numberSums, binaryStr) => {
    [...binaryStr].forEach((bit, index) => {
        numberSums[index] += parseInt(bit);
    });
    return numberSums;
}, new Array(binaryNumbers[0].length).fill(0));

const { gammaRateStr, epsilonRateStr } = sums.reduce(
    (strings, bitSum) => {
        // If the sum is more than half of the number of binary strings,
        // then '1' is the most common bit.
        if (bitSum > binaryNumbers.length / 2) {
            return {
                gammaRateStr: strings.gammaRateStr + '1',
                epsilonRateStr: strings.epsilonRateStr + '0'
            };
        }

        // Otherwise, '0' is the most common bit.
        return {
            gammaRateStr: strings.gammaRateStr + '0',
            epsilonRateStr: strings.epsilonRateStr + '1'
        };
    },
    { gammaRateStr: '', epsilonRateStr: '' }
);

const gammaRate = parseInt(gammaRateStr, 2);
const epsilonRate = parseInt(epsilonRateStr, 2);

const powerConsumption = gammaRate * epsilonRate;

console.log(powerConsumption);
