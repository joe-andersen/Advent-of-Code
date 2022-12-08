const fs = require("fs")

let file = fs.readFileSync("./input.txt");
file = file.toString().split("\n$ ").map((el) => el.split("\n")).slice(1);

class Directory {
    files = [];
    children = [];

    constructor(name, parent) {
        this.name = name;
        this.parent = parent;
    }

    totalSize() {
        const fileSize = this.files.reduce((sum, file) => (sum += Number(file[0])), 0)
        const childrenSize = this.children.reduce((sum, child) => (sum += child.totalSize()), 0);
        return fileSize + childrenSize;
    }

    changeDirectory(target) {
        return target === ".."
            ? this.parent
            : this.children.find((child) => child.name === target);
    }

    add(directoryContents) {
        for (const item of directoryContents) {
            const lineItem = item.split(" ");
            if (item.includes("dir")) {
                this.children.push(new Directory(lineItem[1], this));
            } else {
                this.files.push(lineItem);
            }
        }
    }
}

class Solution {
    constructor(commands) {
        this.commands = commands;
    }

    get directories() {
        return this.parse();
    }

    parse() {
        const root = new Directory("/", null);
        let current = root;

        for (const command of this.commands) {
            const action = command[0].substring(0, 2);
            if (action === "ls") {
                const directoryContents = command.slice(1);
                current.add(directoryContents);
            }
            if (action === "cd") {
                const directory = command[0].substring(3);
                current = current.changeDirectory(directory);
            }
        }

        return root;
    }

    flatten(directory) {
        const result = [directory];
        directory.children.forEach((child) => {
            result.push(...this.flatten(child));
        });

        return result;
    }
}

// Part 1
const solution = new Solution(file);
const directories = solution.directories;
const flattened = solution.flatten(directories);
const sizeLimit = 100000;
let result = flattened.filter((directory) => directory.totalSize() < sizeLimit)
    .reduce((sum, directory) => sum + directory.totalSize(), 0);

console.log(result);

// Part 2
const maxSpace = 40000000;
const requiredSpace = directories.totalSize() - maxSpace;
const deletes = flattened.map((directory) => directory.totalSize())
    .filter((size) => size > requiredSpace);

result = Math.min(...deletes);

console.log(result);