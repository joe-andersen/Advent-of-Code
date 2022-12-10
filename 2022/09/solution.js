const fs = require("fs")

let file = fs.readFileSync("./input.txt");
file = file.toString().split("\n").map((el) => el.split(" "));

class Solution {
    constructor(input, sections) {
        this.input = input;
        this.rope = new Array(sections).fill(0).map(() => ({ x: 0, y: 0 }));
        this.sections = sections;
        this.visitedCoordinates = new Set();
    }

    getCoordinates() {
        this.input.forEach((move) => {
            let [direction, movement] = move;
            movement = parseInt(movement);
            for (let i = 0; i < movement; i++) {
                this.moveHead(direction);
                for (let j = 1; j < this.rope.length; j++) {
                    if (!this.isOverlapping(this.rope[j - 1], this.rope[j])) {
                        this.rope[j] = this.moveTail(this.rope[j - 1], this.rope[j]);
                    }
                }
                this.addPosition();
            }
        });

        return this.visitedCoordinates;
    }

    addPosition() {
        const value = `${this.rope[this.sections - 1].x},${this.rope[this.sections - 1].y}`;
        this.visitedCoordinates.add(value);
    }

    moveHead(direction) {
        switch(direction) {
            case "U":
                this.rope[0].y++;
                break;
            case "D":
                this.rope[0].y--;
                break;
            case "R":
                this.rope[0].x++;
                break;
            case "L":
                this.rope[0].x--;
                break;
            default:
                console.log(`Direction unknown ${direction}`);
        }
    }

    moveTail(current, next) {
        let newCoordinates = { ...next };
        let xDifference = next.x - current.x;
        let yDifference = next.y - current.y;
    
        if (xDifference > 0) {
            newCoordinates.x--;
        } else if (xDifference < 0) {
            newCoordinates.x++;
        }
    
        if (yDifference > 0) {
            newCoordinates.y--;
        } else if (yDifference < 0) {
            newCoordinates.y++;
        }
    
        return newCoordinates;
    }
    
    isOverlapping(section1, section2) {
        let xDifference = Math.abs(section1.x - section2.x);
        let yDifference = Math.abs(section1.y - section2.y);
    
        return xDifference <= 1 && yDifference <= 1;
    }
}

// Part 1
const solution = new Solution(file, 2);
const visitedCoordinates = solution.getCoordinates();

console.log(visitedCoordinates.size);

// Part 2
const solution2 = new Solution(file, 10);
const visitedCoordinates2 = solution2.getCoordinates();

console.log(visitedCoordinates2.size);
