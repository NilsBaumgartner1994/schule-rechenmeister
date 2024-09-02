import React from "react";

export class DivisionTaskGenerator {

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

        taskWithSolution.task = solution + " : " + coreRow;
        taskWithSolution.solution = multNumber;

        return taskWithSolution;
    }

    static generateAllTaskWithoutEasyOnes() {
        let taskWithSolution = {
            task: "",
            solution: 0
        }

        let firstNumber = this.generateNumberFromTo(2, 10); // no base with value 1
        let secondNumber = this.generateNumberFromTo(2, 10); // no division by 1
        let solution = firstNumber * secondNumber;

        taskWithSolution.task = solution + " : " + firstNumber;
        taskWithSolution.solution = secondNumber;

        return taskWithSolution;
    }

}
