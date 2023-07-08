const UP_RIGHT = 0;
const UP_LEFT = 1;
const DOWN_RIGHT = 2;
const DOWN_LEFT = 3;
const SIZE = 30;
const CANVAS = 750;
const ROCK_ID = 1;
const PAPER_ID = 2;
const SCISSORS_ID = 3;

function getObjArray() {
    return [
        createObj(SCISSORS_ID, 10, 10),
        createObj(SCISSORS_ID, 10, 60),
        createObj(SCISSORS_ID, 10, 110),
        createObj(SCISSORS_ID, 10, 160),
        createObj(SCISSORS_ID, 60, 10),
        createObj(SCISSORS_ID, 60, 60),
        createObj(SCISSORS_ID, 60, 110),
        createObj(SCISSORS_ID, 110, 10),
        createObj(SCISSORS_ID, 110, 60),
        createObj(SCISSORS_ID, 160, 10),

        createObj(PAPER_ID, 10, 760),
        createObj(PAPER_ID, 10, 710),
        createObj(PAPER_ID, 10, 660),
        createObj(PAPER_ID, 10, 610),
        createObj(PAPER_ID, 60, 760),
        createObj(PAPER_ID, 60, 710),
        createObj(PAPER_ID, 60, 660),
        createObj(PAPER_ID, 110, 760),
        createObj(PAPER_ID, 110, 710),
        createObj(PAPER_ID, 160, 760),

        createObj(ROCK_ID, 760, 760),
        createObj(ROCK_ID, 760, 710),
        createObj(ROCK_ID, 760, 660),
        createObj(ROCK_ID, 760, 610),
        createObj(ROCK_ID, 710, 760),
        createObj(ROCK_ID, 710, 710),
        createObj(ROCK_ID, 710, 660),
        createObj(ROCK_ID, 660, 760),
        createObj(ROCK_ID, 660, 710),
        createObj(ROCK_ID, 610, 760),
    ]
} 

function createObj(status, x, y) {
    return {
        status: status,
        x: x,
        y: y,
        direction: rando(4),
        colliding: false
    }
}

function rando(bounds) {
    return Math.floor(Math.random() * bounds);
}