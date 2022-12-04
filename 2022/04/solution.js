const fs = require("fs")

let file = fs.readFileSync("./input.txt");
file = file.toString().split("\n");

class Solution {
    constructor(sections) {
        this.secitons = sections;
    }

    contains(fullCompare = false) {
        const list = this.secitons.split(",");
        if (list[0] === list[1]) return true;
        const sectionOneRange = this.range(parseInt(list[0].split("-")[0]), parseInt(list[0].split("-")[1]));
        const sectionTwoRange = this.range(parseInt(list[1].split("-")[0]), parseInt(list[1].split("-")[1]));
        if (fullCompare) {
            return sectionOneRange.every(r => sectionTwoRange.includes(r))
                || sectionTwoRange.every(r => sectionOneRange.includes(r));
        } else {
            return sectionOneRange.some(r => sectionTwoRange.indexOf(r) >= 0); 
        }
    }

    range(lowerBound, upperBound) {
        var list = [];
        for (let i = lowerBound; i <= upperBound; i++) {
            list.push(i);
        }
        return list;
    }

}

// Part 1
let totalPairs = 0;
for (let i = 0; i < file.length; i++) {
    const sections = file[i];
    const solution = new Solution(sections);
    const isDuplicate = solution.contains(true);
    if (isDuplicate) totalPairs += 1;
}

console.log(totalPairs);


// Part 2
totalPairs = 0;
for (let i = 0; i < file.length; i++) {
    const sections = file[i];
    const solution = new Solution(sections);
    const isDuplicate = solution.contains();
    if (isDuplicate) totalPairs += 1;
}

console.log(totalPairs);