import {AdditionBaseTaskGenerator} from "./AdditionBaseTaskGenerator";
import {TaskWithSolutionType} from "@/components/TaskTemplate";


export class AdditionTaskGenerator {

    static generateWithoutTenTransition(maxNumber: any): TaskWithSolutionType {
        let baseTask = AdditionBaseTaskGenerator.generateWithoutTenTransition(maxNumber);
        let taskWithSolution = {
            task: baseTask.higherNumber + " + " + baseTask.lowerNumber,
            solution: baseTask.solution
        }

        return taskWithSolution;
    }

    static generateWithTenTransition(maxNumber: any): TaskWithSolutionType {
        let baseTask = AdditionBaseTaskGenerator.generateWithTenTransition(maxNumber);

        let taskWithSolution = {
            task: baseTask.higherNumber + " + " + baseTask.lowerNumber,
            solution: baseTask.solution
        }

        return taskWithSolution;
    }

    static generateWithTenTransitionSingleNumber(maxNumber: any): TaskWithSolutionType {
        let baseTask = AdditionBaseTaskGenerator.generateWithTenTransitionSingleNumber(maxNumber);

        let taskWithSolution = {
            task: baseTask.higherNumber + " + " + baseTask.lowerNumber,
            solution: baseTask.solution
        }

        return taskWithSolution;
    }
}
