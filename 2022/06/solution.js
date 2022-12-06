const fs = require("fs")

let file = fs.readFileSync("./input.txt");
file = file.toString();

class Solution {
    constructor(signal) {
        this.signal = signal;
        this.message = new Set();
    }

    sort(marker) {
        for (let i = 0; i < this.signal.length; i++) {
            this.message.add(this.signal[i].toString());
            if (this.message.size === marker) {
                return true;
            };
        }
    }
}

// Part 1
let chunkSize = 4;
for (let i = chunkSize; i < file.length; i++) {
    const solution = new Solution(file.slice(i - chunkSize, i));
    const result = solution.sort(chunkSize);
    if (result) {
        console.log(i);
        break;
    }
}
// Part 2
chunkSize = 14;
for (let i = chunkSize; i < file.length; i++) {
    const solution2 = new Solution(file.slice(i - chunkSize, i));
    const result2 = solution2.sort(chunkSize);
    if (result2) {
        console.log(i);
        break;
    }
}
