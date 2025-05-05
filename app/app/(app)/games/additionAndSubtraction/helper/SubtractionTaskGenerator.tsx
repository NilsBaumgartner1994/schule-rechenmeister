import React from "react";
import {AdditionBaseTaskGenerator} from "./AdditionBaseTaskGenerator";

export class SubtractionTaskGenerator {

    static generateEasy(maxNumber: any) {
        let baseTask = AdditionBaseTaskGenerator.generateWithoutTenTransition(maxNumber);
        let taskWithSolution = {
            task: baseTask.solution + " - " + baseTask.lowerNumber,
            solution: baseTask.higherNumber
        }

        return taskWithSolution;
    }

    static generateMedium(maxNumber: any) {
        let baseTask = AdditionBaseTaskGenerator.generateWithTenTransitionSingleNumber(maxNumber);

        let taskWithSolution = {
            task: baseTask.solution + " - " + baseTask.lowerNumber,
            solution: baseTask.higherNumber
        }

        return taskWithSolution;
    }

    static generateHard(maxNumber: any) {
        let baseTask = AdditionBaseTaskGenerator.generateWithTenTransition(maxNumber);

        let taskWithSolution = {
            task: baseTask.solution + " - " + baseTask.lowerNumber,
            solution: baseTask.higherNumber
        }

        return taskWithSolution;
    }

}
