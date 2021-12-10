const input = require('./input.js');

const binaryNumbers = input.split('\n');

const getBitCriteria = (binaryStrings, index, type) => {
    const arrayLength = binaryStrings.length;
    const bitSum = binaryStrings.reduce(
        (numberSums, binaryStr) => numberSums + parseInt(binaryStr[index]),
        0
    );

    if (type === 'gamma') {
        return bitSum >= arrayLength / 2 ? '1' : '0';
    }

    return bitSum < arrayLength / 2 ? '1' : '0';
};

const calculateRating = (binaryStrings, type) => {
    let allStrings = [...binaryStrings];

    let index = 0;
    while (allStrings.length > 1) {
        const bitCriteria = getBitCriteria(allStrings, index, type);
        allStrings = allStrings.filter(
            (string) => string.charAt(index) === bitCriteria
        );
        index++;
    }
    return allStrings[0];
};

const oxygenRatingStr = calculateRating(binaryNumbers, 'gamma');
const co2RatingStr = calculateRating(binaryNumbers, 'epsilon');

const oxygenRating = parseInt(oxygenRatingStr, 2);
const co2Rating = parseInt(co2RatingStr, 2);

const lifeSupportRating = oxygenRating * co2Rating;

console.log(lifeSupportRating);
