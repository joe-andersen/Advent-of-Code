const fs = require("fs")

let file = fs.readFileSync("./input.txt");
file = file.toString().split("\n");


class Solution {
    constructor(data, movements = [], stacks = []) {
        this.data = data;
        this.movements = movements;
        this.stacks = stacks;
    }

    containsNumbers(str) {
        return /\d/.test(str);
      }

    initStacks() {
        const rows = [];
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i] === "" || this.containsNumbers(this.data[i])) break;
            rows.push(this.data[i].match(/.{1,4}/g).toString().replace(/\s/g, "").split(","));
        };

        for (let i = 0; i <= rows.length; i++) {
            let columns = [];
            for (let j = 0; j < 8; j++) {
                columns.push(rows[j][i]);
            }
            
            columns = columns.filter(e => e);
            this.stacks.push(columns);
        }
    }

    initMovements() {
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].includes("move")) {
                this.movements.push(this.data[i]);
            }
        }
    }

    moveStack(move, maintainOrder) {
        const copy = JSON.parse(JSON.stringify(this.stacks))
        const list = move.split(" ");
        const numberOfCratesToMove = list[1];
        const moveCratesFrom = list[3] - 1;
        const moveCratesTo = list[5] - 1;
        
        if (maintainOrder) {
            for (let i = numberOfCratesToMove; i > 0; i--) {
                copy[moveCratesTo].unshift(this.stacks[moveCratesFrom][i - 1]);
            }
            for (let i = 1; i <= numberOfCratesToMove; i++) {
                copy[moveCratesFrom].shift();
            }
            this.stacks = copy;
        } else {
            for (let i = 1; i <= numberOfCratesToMove; i++) {
                if (this.stacks[moveCratesFrom].length > 0) {
                    this.stacks[moveCratesTo].unshift(this.stacks[moveCratesFrom][0]);
                    this.stacks[moveCratesFrom].shift();
                }
            }
        }
    }
}

// Part 1
const solution = new Solution(file);
solution.initMovements();
solution.initStacks();

for (let i = 0; i < solution.movements.length; i++) {
    solution.moveStack(solution.movements[i]), false;
}

let total = "";

for (let i = 0; i < solution.stacks.length; i++) {
    total += solution.stacks[i][0].replace("[", "").replace("]", "");
}

console.log(total);

// Part 2
const solution2 = new Solution(file);
solution2.initMovements();
solution2.initStacks();

for (let i = 0; i < solution2.movements.length; i++) {
    solution2.moveStack(solution2.movements[i], true);
}

total = "";

for (let i = 0; i < solution2.stacks.length; i++) {
    total += solution2.stacks[i][0].replace("[", "").replace("]", "");
}

console.log(total);