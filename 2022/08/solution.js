const fs = require("fs")

let file = fs.readFileSync("./input.txt").toString().split("\n").map((x) => [...x].map(Number));

// console.log(file);

// Example data
// file = `30373
// 25512
// 65332
// 33549
// 35390`.split("\n").map((x) => [...x].map(Number));

// console.log(file);

class Solution {
    constructor(input) {
        this.input = input;
        this.visible = new Set();
    }

    setVisible(x, y) {
        this.visible.add(`${x}-${y}`);
    }

    isEdge(x, y) {
        return y < 0 || y >= this.input.length || x < 0 || x >= this.input[y].length
    }

    isVisible(x, y, x2, y2) {
        this.setVisible(x, y);
        let max = this.input[y][x];
        while (true) {
            x += x2;
            y += y2;
            if (this.isEdge(x, y)) break;
            if (this.input[y][x] > max) {
                max = this.input[y][x];
                this.setVisible(x, y);
            }
        }
    }

    isIdeal(x, y, x2, y2) {
        let totalVisible = 0;
        let max = this.input[y][x];
        while (true) {
            x += x2;
            y += y2;
            if (this.isEdge(x, y)) break;
            totalVisible++;
            if (this.input[y][x] >= max) break;
        }

        return totalVisible;
    }
}

// Part 1
const solution = new Solution(file);

// visible columns
for (let i = 0; i < solution.input[0].length; i++) {
    solution.isVisible(i, 0, 0, 1);
    solution.isVisible(i, solution.input.length - 1, 0, -1);
}
// visible rows
for (let i = 0; i < solution.input.length; i++) {
    solution.isVisible(0, i, 1, 0);
    solution.isVisible(solution.input[0].length - 1, i, -1, 0);
}

console.log(solution.visible.size);

// Part 2
let max = 0;
for (let i = 0; i < solution.input.length; i++) {
    for (let j = 0; j < solution.input[i].length; j++) {
        const score = solution.isIdeal(j, i, 0, -1) *
            solution.isIdeal(j, i, 0, 1) *
            solution.isIdeal(j, i, 1, 0) *
            solution.isIdeal(j, i, -1, 0);
        
        if (score > max) max = score;
    }
}

console.log(max);