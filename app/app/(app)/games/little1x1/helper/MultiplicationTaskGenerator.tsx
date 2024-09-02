import React from "react";

export class MultiplicationTaskGenerator {

    static generateNumberFromTo(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static generateCoreTask() {
        let taskWithSolution = {
            task: "",
            solution: 0
        }

        let coreRows = [1,2,5,10];

        let coreRow = coreRows[this.generateNumberFromTo(0, coreRows.length - 1)];
        let multNumber = this.generateNumberFromTo(1, 9);
        let solution = coreRow * multNumber;

        taskWithSolution.task = multNumber + " ⋅ " + coreRow;
        taskWithSolution.solution = solution;

        return taskWithSolution;
    }

    static generateAllTask() {
        let taskWithSolution = {
            task: "",
            solution: 0
        }

        let firstNumber = this.generateNumberFromTo(1, 10);
        let secondNumber = this.generateNumberFromTo(1, 10);
        let solution = firstNumber * secondNumber;

        taskWithSolution.task = firstNumber + " ⋅ " + secondNumber;
        taskWithSolution.solution = solution;

        return taskWithSolution;
    }

}
