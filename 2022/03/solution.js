const fs = require("fs")

let file = fs.readFileSync("./input.txt");
file = file.toString().split("\n");

class Rucksack {
    constructor(items) {
        this.badge = new Set();
        this.items = items;
        this.total = 0;
    }

    get priority() {
        this.badge.forEach((item) => {
            if (item.toLowerCase() === item) {
                this.total += item.charCodeAt(0) - 96;
            } else {
                this.total += (item.toLowerCase().charCodeAt(0) - 96) + 26;
            };
        });
        return this.total;
    }

    firstCompartment(item) {
        return item.slice(0, item.length / 2)
    }

    secondCompartment(item) {
        return item.slice(item.length / 2)
    }

    getSingleOverlap() {
        const str1 = this.firstCompartment(this.items).split("");
        const str2 = this.secondCompartment(this.items).split("");
        for (let i in str1) {
            if (str2.includes(str1[i])) {
                if (!this.badge.has[str1[i]]) this.badge.add(str1[i]);
            }
        }
    }

    getMultipleOverlap() {
        const copyOfItems = JSON.parse(JSON.stringify(this.items));
        const str1 = copyOfItems.shift();
        for (let i in str1) {
            if (copyOfItems[0].includes(str1[i]) && copyOfItems[1].includes(str1[i])) {
                if (!this.badge.has[str1[i]]) this.badge.add(str1[i]);
            }
        }
    }
}

// Part 1
let totalPriorities = 0;
for (let i = 0; i < file.length; i++) {
    const ruckSack = new Rucksack(file[i]);
    ruckSack.getSingleOverlap();
    const priority = ruckSack.priority;
    totalPriorities += priority;
}

console.log(totalPriorities);


// Part 2
const chunkSize = 3;
totalPriorities = 0;
for (let i = 0; i < file.length; i += chunkSize) {
    const chunk = file.slice(i, i + chunkSize);
    const ruckSack = new Rucksack(chunk);
    ruckSack.getMultipleOverlap();
    const priority = ruckSack.priority;
    totalPriorities += priority;
}

console.log(totalPriorities);