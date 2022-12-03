const fs = require("fs")

let file = fs.readFileSync("./input.txt");
file = file.toString().split("\n");

const draw = 3;
const win = 6;
const loss = 0;

const rockScore = 1;
const paperScore = 2;
const scissorsScore = 3;

const rock = ["A", "X"];
const paper = ["B", "Y"];
const scissors = ["C", "Z"];

// Part 1
let totalScore = 0;

file.map((round) => {
    const playersMoves = round.split(" ");
    // draw
    if (rock.includes(playersMoves[0]) && rock.includes(playersMoves[1])) totalScore += rockScore + draw;
    if (paper.includes(playersMoves[0]) && paper.includes(playersMoves[1])) totalScore += paperScore + draw;
    if (scissors.includes(playersMoves[0]) && scissors.includes(playersMoves[1])) totalScore += scissorsScore + draw;
    // win
    if (rock.includes(playersMoves[0]) && paper.includes(playersMoves[1])) totalScore += paperScore + win;
    if (paper.includes(playersMoves[0]) && scissors.includes(playersMoves[1])) totalScore += scissorsScore + win;
    if (scissors.includes(playersMoves[0]) && rock.includes(playersMoves[1])) totalScore += rockScore + win;
    // loss
    if (rock.includes(playersMoves[0]) && scissors.includes(playersMoves[1])) totalScore += scissorsScore + loss;
    if (paper.includes(playersMoves[0]) && rock.includes(playersMoves[1])) totalScore += rockScore + loss;
    if (scissors.includes(playersMoves[0]) && paper.includes(playersMoves[1])) totalScore += paperScore + loss;
});

console.log(totalScore);

// Part 2
totalScore = 0;

file.map((round) => {
    const playersMoves = round.split(" ");
    // draw
    if (paper.includes(playersMoves[1])) {
        if (rock.includes(playersMoves[0])) totalScore += rockScore + draw;
        if (paper.includes(playersMoves[0])) totalScore += paperScore + draw;
        if (scissors.includes(playersMoves[0])) totalScore += scissorsScore + draw;
    }
    // win
    if (scissors.includes(playersMoves[1])) {
        if (rock.includes(playersMoves[0])) totalScore += paperScore + win;
        if (paper.includes(playersMoves[0])) totalScore += scissorsScore + win;
        if (scissors.includes(playersMoves[0])) totalScore += rockScore + win;    
    }
    // loss
    if (rock.includes(playersMoves[1])) {
        if (rock.includes(playersMoves[0])) totalScore += scissorsScore + loss;
        if (paper.includes(playersMoves[0])) totalScore += rockScore + loss;
        if (scissors.includes(playersMoves[0])) totalScore += paperScore + loss;
    }
});

console.log(totalScore);