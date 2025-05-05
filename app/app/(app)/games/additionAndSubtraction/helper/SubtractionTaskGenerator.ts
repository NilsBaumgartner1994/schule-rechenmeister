import {AdditionBaseTaskGenerator, AdditionTaskGeneratorSettings} from "./AdditionBaseTaskGenerator";

export class SubtractionTaskGenerator {

    static generateTask(taskGeneratorSettings: AdditionTaskGeneratorSettings){
        let baseTask = AdditionBaseTaskGenerator.generateTaskWithSolution(taskGeneratorSettings);

        let taskWithSolution = {
            task: baseTask.solution + " - " + baseTask.lowerNumber,
            solution: baseTask.higherNumber
        }

        return taskWithSolution;
    }

}
