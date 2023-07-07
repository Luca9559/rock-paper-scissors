const canvas = document.getElementById("canvas");
const UP_RIGHT = 0;
const UP_LEFT = 1;
const DOWN_RIGHT = 2;
const DOWN_LEFT = 3;
const SIZE = 50;
const CANVAS = 750;
const ROCK_ID = 1;
const PAPER_ID = 2;
const SCISSORS_ID = 3;
let rock;
let paper;
let scissor;
let ctx;
let objArray;

init();
let interval = setInterval(draw, 10);

function init() {
    objArray = [
        createObj(SCISSORS_ID, 10, 10),
        createObj(SCISSORS_ID, 80, 10),
        createObj(SCISSORS_ID, 10, 80),
        createObj(SCISSORS_ID, 10, 150),
        createObj(SCISSORS_ID, 150, 10),
        createObj(SCISSORS_ID, 80, 80),
        createObj(PAPER_ID, 10, 740),
        createObj(PAPER_ID, 80, 740),
        createObj(PAPER_ID, 10, 670),
        createObj(PAPER_ID, 10, 600),
        createObj(PAPER_ID, 150, 740),
        createObj(PAPER_ID, 80, 670),
        createObj(ROCK_ID, 740, 740),
        createObj(ROCK_ID, 670, 740),
        createObj(ROCK_ID, 740, 670),
        createObj(ROCK_ID, 670, 670),
        createObj(ROCK_ID, 740, 600),
        createObj(ROCK_ID, 600, 740),
    ]
    if (canvas.getContext) {
        ctx = canvas.getContext("2d");
    }
    rock = new Image();
    rock.src = 'assets/rock.png';
    paper = new Image();
    paper.src = 'assets/paper.png';
    scissor = new Image();
    scissor.src = 'assets/scissors.png';
}

function createObj(status, x, y) {
    return {
        status: status,
        x: x,
        y: y,
        direction: rando(),
        colliding: false
    }
}

function draw() {
    ctx.clearRect(0, 0, 800, 800);
    for (let i = 0; i < objArray.length; i++) {
        update(i);
        if (objArray[i].status === SCISSORS_ID) {
            ctx.drawImage(scissor, objArray[i].x, objArray[i].y);
        } else if (objArray[i].status === ROCK_ID) {
            ctx.drawImage(rock, objArray[i].x, objArray[i].y);
        } else if (objArray[i].status === PAPER_ID) {
            ctx.drawImage(paper, objArray[i].x, objArray[i].y);
        }
    }
    if (shouldRestart()) {
        clearInterval(interval);
    }
}

function update(index) {
    const obj = objArray[index];
    switch (obj.direction) {
        case DOWN_RIGHT:
            obj.x++;
            obj.y++;
            break;
        case DOWN_LEFT:
            obj.x--;
            obj.y++;
            break;
        case UP_RIGHT:
            obj.x++;
            obj.y--;
            break;
        case UP_LEFT:
            obj.x--;
            obj.y--;
            break;
    }
    updateCollision(index);
}

function updateCollision(index) {
    const obj1 = objArray[index];
    for (let i = 0; i < objArray.length; i++) {
        if (i === index) {
            continue;
        }
        
        // Walls
        if (obj1.x <= 0) {
            obj1.direction = obj1.direction === UP_LEFT ? UP_RIGHT : DOWN_RIGHT;
            return;
        }
        if (obj1.x >= CANVAS) {
            obj1.direction = obj1.direction === UP_RIGHT ? UP_LEFT : DOWN_LEFT;
            return;
        }
        if (obj1.y <= 0) {
            obj1.direction = obj1.direction === UP_LEFT ? DOWN_LEFT : DOWN_RIGHT;
            return;
        }
        if (obj1.y >= CANVAS) {
            obj1.direction = obj1.direction === DOWN_RIGHT ? UP_RIGHT : UP_LEFT;
            return;
        }

        const obj2 = objArray[i];
        if (obj1.x + SIZE >= obj2.x && obj1.x <= obj2.x + SIZE &&
            obj1.y + SIZE >= obj2.y && obj1.y <= obj2.y + SIZE) {
            
            if (!obj1.colliding) {
                obj1.direction = getNewDirection(obj1.direction);
                obj1.status = battle(obj1, obj2);
                obj1.colliding = true;
            }
        } else {
            obj1.colliding = false;
        }
    }
}

function getNewDirection(currentDirection) {
    let rando = Math.floor(Math.random() * 4);
    while (currentDirection === rando) {
        rando = Math.floor(Math.random() * 4);
    }
    return rando;
}

function battle(obj1, obj2) {
    if (obj1.status === SCISSORS_ID && obj2.status === ROCK_ID) {
        return ROCK_ID;
    }
    if (obj1.status === PAPER_ID && obj2.status === SCISSORS_ID) {
        return SCISSORS_ID;
    }
    if (obj1.status === ROCK_ID && obj2.status === PAPER_ID) {
        return PAPER_ID;
    }
    return obj1.status;
}

function shouldRestart() {
    let firstObj = objArray[0];
    for (let i = 1; i < objArray.length; i++) {
        if (firstObj.status !== objArray[i].status) {
            return false;
        }
    }
    return true;
}

function rando() {
    return Math.floor(Math.random() * 4);
}

function restart() {
    init();
    clearInterval(interval);
    interval = setInterval(draw, 10);
}


