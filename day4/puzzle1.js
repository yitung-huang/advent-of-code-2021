const input = require('./input.js');

const BOARD_DIMENSIONS = 5;
const MARKED = 'X';

const [drawnNumbers, ...restLines] = input.split('\n');
const boardLines = restLines.filter((line) => line !== '');

// Parse the lines into individual boards
let boards = boardLines.reduce((boards, currentLine, index) => {
    if (index % BOARD_DIMENSIONS === 0) {
        const newBoard = [];
        for (let i = 0; i < BOARD_DIMENSIONS; i++) {
            newBoard.push(
                boardLines[index + i]
                    .trim()
                    .split(' ')
                    .map((numStr) => parseInt(numStr))
                    .filter((num) => !isNaN(num))
            );
        }
        boards.push(newBoard);
    }
    return boards;
}, []);

// Helper function that checks if a given board has won
const checkBoardHasWon = (board) => {
    let hasWon = false;

    // Check horizontal lines
    board.forEach((horizontalLine) => {
        const numMarked = horizontalLine.filter(
            (number) => number === MARKED
        ).length;
        if (numMarked === BOARD_DIMENSIONS) {
            hasWon = true;
        }
    });

    // Check vertical lines
    const verticalNumMarked = board.reduce(
        (verticalSums, currentLine, index) => {
            let sum = 0;
            board.forEach((line) => {
                if (line[index] === MARKED) {
                    sum++;
                }
            });
            verticalSums[index] = sum;

            return verticalSums;
        },
        new Array(BOARD_DIMENSIONS).fill(0)
    );

    if (verticalNumMarked.includes(BOARD_DIMENSIONS)) {
        hasWon = true;
    }

    return hasWon;
};

// Helper function that checks if any board has won and return the index of the winning board.
const checkGameHasEnded = () => {
    let winningBoard = -1;

    boards.forEach((board, index) => {
        if (checkBoardHasWon(board)) {
            winningBoard = index;
        }
    });
    return winningBoard;
};

// Helper function that marks a given number on a given board
const markBoardNumber = (board, number) =>
    board.map((line) => {
        if (line.includes(number)) {
            const numberIndex = line.indexOf(number);
            line[numberIndex] = MARKED;
        }
        return line;
    });

// Helper function that marks a given number on all boards
const drawNumber = (number) =>
    (boards = boards.map((board) => markBoardNumber(board, parseInt(number))));

// Main function that run the game rounds
const runGameRounds = () => {
    const numbers = drawnNumbers.split(',');

    let winner = -1;
    let winningNumber = -1;

    // Go through all the numbers drawn until we get a winner
    numbers.forEach((number) => {
        if (winner !== -1) {
            return;
        }

        drawNumber(number);
        winner = checkGameHasEnded();
        if (winner !== -1) {
            winningNumber = number;
        }
    });

    // Calculate the final score
    const winnerBoard = boards[winner];
    const unmarkedNumSum = winnerBoard
        .flat()
        .filter((number) => number !== MARKED)
        .reduce((sum, number) => sum + number);

    const finalScore = unmarkedNumSum * winningNumber;

    console.log(
        `We have a winner! Winner board index is ${winner} with ${finalScore} points!`
    );
};

runGameRounds();
