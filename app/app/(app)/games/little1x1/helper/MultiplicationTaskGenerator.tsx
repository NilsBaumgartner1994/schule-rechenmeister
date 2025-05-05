import React from "react";
import {DivisionTaskGenerator} from "@/app/(app)/games/little1x1/helper/DivisionTaskGenerator";

export class MultiplicationTaskGenerator {

    static generateCoreTask() {
        let taskWithSolution = {
            task: "",
            solution: 0
        }

        let coreRows = [1,2,5,10];

        let coreRow = coreRows[DivisionTaskGenerator.generateNumberFromTo(0, coreRows.length - 1)];
        let multNumber = DivisionTaskGenerator.generateNumberFromTo(1, 9);
        let solution = coreRow * multNumber;

        taskWithSolution.task = multNumber + " ⋅ " + coreRow;
        taskWithSolution.solution = solution;

        return taskWithSolution;
    }

    static generateAllTaskWithoutEasyOnes() {
        let taskWithSolution = {
            task: "",
            solution: 0
        }

        let firstNumber = DivisionTaskGenerator.generateNumberFromTo(2, 9); // no multiplication by 1 or by 10
        let secondNumber = DivisionTaskGenerator.generateNumberFromTo(2, 9); // no multiplication by 1 or by 10
        let solution = firstNumber * secondNumber;

        taskWithSolution.task = firstNumber + " ⋅ " + secondNumber;
        taskWithSolution.solution = solution;

        return taskWithSolution;
    }

}
