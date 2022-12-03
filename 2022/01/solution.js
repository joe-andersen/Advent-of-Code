const fs = require("fs")

let file = fs.readFileSync("./input.txt");
file = file.toString().split("\n");

const isValid = (value) => {
    return value !== "";
};

const elfExists = (elfName) => {
    return elfName in elfCalories;
}

let elfCalories = {};
let currentElf = 1;

for (let i = 0; i < file.length; i++) {
    const elfName = `Elf-${currentElf}`;
    if (isValid(file[i])) {
        if (!elfExists(elfName)) {
            elfCalories[elfName] = {
                food: [],
                total: 0,
            }
        }
        elfCalories[elfName].food.push(parseInt(file[i]));
    } else {
        elfCalories[elfName].total = elfCalories[elfName]?.food.reduce((accumulator, value) => {
            return accumulator + value;
        }, 0);
        currentElf++;
    }
}

const elfs = Object.keys(elfCalories);
const totals = elfs.map((elf) => {
    return elfCalories[elf].total;
});

// Part 1
const max = Math.max.apply(null, totals);
console.log(max);

totals.sort();
totals.reverse();

const topThree = totals.slice(0, 3).reduce((accumulator, a) => accumulator + a, 0);

// Part 2
console.log(topThree);