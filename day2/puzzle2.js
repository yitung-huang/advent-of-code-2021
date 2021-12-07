const input = require('./input.js');

const { horizontal: finalHorizontal, depth: finalDepth } = input
    .split(`\n`)
    .reduce(
        (movement, currentMovement) => {
            const [instruction, distance] = currentMovement.split(' ');
            switch (instruction) {
                case 'forward':
                    movement.horizontal += parseInt(distance);
                    movement.depth += movement.aim * parseInt(distance);
                    break;

                case 'up':
                    movement.aim -= parseInt(distance);
                    break;

                case 'down':
                    movement.aim += parseInt(distance);
                    break;

                default:
                    break;
            }
            return movement;
        },
        { horizontal: 0, depth: 0, aim: 0 }
    );

console.log(finalHorizontal * finalDepth);
