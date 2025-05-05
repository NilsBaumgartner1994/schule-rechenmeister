import {AdditionBaseTaskGenerator, AdditionTaskGeneratorSettings} from "./AdditionBaseTaskGenerator";


export class AdditionTaskGenerator {

    static generateTask(taskGeneratorSettings: AdditionTaskGeneratorSettings){
        let baseTask = AdditionBaseTaskGenerator.generateTaskWithSolution(taskGeneratorSettings);

        let taskWithSolution = {
            task: baseTask.higherNumber + " + " + baseTask.lowerNumber,
            solution: baseTask.solution
        }

        return taskWithSolution;
    }

}
