export type AdditionTaskGeneratorSettings = {
    firstNumberNumberMin: number;
    firstNumberNumberMax: number;
    firstNumberAllowedMultipleOfTen: boolean;
    secondNumberNumberMin: number;
    secondNumberNumberMax: number;
    secondNumberAllowedMultipleOfTen: boolean;
    includeTasksWithoutCarryOver: boolean; // e.g. 1+2, 2+3, 114+114
    includeTasksWithCarryOver: boolean; // e.g. 9+2, 8+3, 19+1
    solutionMinInclusive: number;
    solutionMaxInclusive: number;
    solutionAllowedMultipleOfTen: boolean;
}

export type TaskWithSolutionType = {
    higherNumber: number;
    lowerNumber: number;
    firstNumber: number;
    secondNumber: number;
    solution: number;
}

export class AdditionBaseTaskGenerator {

    static hasAdditionAtAnyPlacevalueCarryOver(firstNumber: number, secondNumber: number): boolean {
        if(firstNumber <= 0 || secondNumber <= 0) {
            return false;
        }
        let firstNumberOne = firstNumber % 10;
        let secondNumberOne = secondNumber % 10;
        if(firstNumberOne + secondNumberOne >= 10) {
            return true;
        } else {
            // so we need to check the next place value
            let firstNumberRest = Math.floor(firstNumber / 10);
            let secondNumberRest = Math.floor(secondNumber / 10);
            return AdditionBaseTaskGenerator.hasAdditionAtAnyPlacevalueCarryOver(firstNumberRest, secondNumberRest);
        }
    }

    static DICT_ALL_TASK: Record<string, Record<string, TaskWithSolutionType>> = {};
    static generateTaskWithSolution(taskGeneratorSettings: AdditionTaskGeneratorSettings) {
        let taskGeneratorSettingsAsString = JSON.stringify(taskGeneratorSettings);
        let allTaskDictForTaskGeneratorSettings = AdditionBaseTaskGenerator.DICT_ALL_TASK[taskGeneratorSettingsAsString];
        if(!allTaskDictForTaskGeneratorSettings) {
            // Generate all tasks with the given settings
            let includeTasksWithoutCarryOver = taskGeneratorSettings.includeTasksWithoutCarryOver;
            let includeTasksWithCarryOver = taskGeneratorSettings.includeTasksWithCarryOver;
            let solutionMinInclusive = taskGeneratorSettings.solutionMinInclusive;
            let solutionMaxInclusive = taskGeneratorSettings.solutionMaxInclusive;
            let solutionAllowedMultipleOfTen = taskGeneratorSettings.solutionAllowedMultipleOfTen;
            let firstNumberNumberMin = taskGeneratorSettings.firstNumberNumberMin;
            let firstNumberNumberMax = taskGeneratorSettings.firstNumberNumberMax;
            let firstNumberAllowedMultipleOfTen = taskGeneratorSettings.firstNumberAllowedMultipleOfTen;
            let secondNumberNumberMin = taskGeneratorSettings.secondNumberNumberMin;
            let secondNumberNumberMax = taskGeneratorSettings.secondNumberNumberMax;
            let secondNumberAllowedMultipleOfTen = taskGeneratorSettings.secondNumberAllowedMultipleOfTen;

            allTaskDictForTaskGeneratorSettings = {};
            for(let firstNumber = firstNumberNumberMin; firstNumber <= firstNumberNumberMax; firstNumber++) {
                for(let secondNumber = secondNumberNumberMin; secondNumber <= secondNumberNumberMax; secondNumber++) {
                    let smallerNumber = Math.min(firstNumber, secondNumber);
                    let largerNumber = Math.max(firstNumber, secondNumber);
                    let solution = smallerNumber + largerNumber;
                    let taskKey = largerNumber + "+" + smallerNumber;
                    if(allTaskDictForTaskGeneratorSettings[taskKey] === undefined) { // only add if not already present
                        let isFirstNumberMultipleOfTen = AdditionBaseTaskGenerator.isMultipleOfTen(firstNumber);
                        if(!firstNumberAllowedMultipleOfTen && isFirstNumberMultipleOfTen) {
                            continue;
                        }

                        let isSecondNumberMultipleOfTen = AdditionBaseTaskGenerator.isMultipleOfTen(secondNumber);
                        if(!secondNumberAllowedMultipleOfTen && isSecondNumberMultipleOfTen) {
                            continue;
                        }

                        let isSolutionMultipleOfTen = AdditionBaseTaskGenerator.isMultipleOfTen(solution);
                        if(!solutionAllowedMultipleOfTen && isSolutionMultipleOfTen) {
                            continue;
                        }

                        if(solution < solutionMinInclusive || solution > solutionMaxInclusive) {
                            continue;
                        }
                        let hasAtAnyPlacevalueCarryOver = AdditionBaseTaskGenerator.hasAdditionAtAnyPlacevalueCarryOver(firstNumber, secondNumber);
                        if(hasAtAnyPlacevalueCarryOver && !includeTasksWithCarryOver) {
                            continue;
                        }
                        if(!hasAtAnyPlacevalueCarryOver && !includeTasksWithoutCarryOver) {
                            continue;
                        }

                        // add the task to the dictionary
                        allTaskDictForTaskGeneratorSettings[taskKey] = {
                            higherNumber: largerNumber,
                            lowerNumber: smallerNumber,
                            firstNumber: firstNumber,
                            secondNumber: secondNumber,
                            solution: solution
                        }
                    }
                }
            }
            AdditionBaseTaskGenerator.DICT_ALL_TASK[taskGeneratorSettingsAsString] = allTaskDictForTaskGeneratorSettings;
            console.log("Generated tasks for settings: ", taskGeneratorSettingsAsString);
            console.log(allTaskDictForTaskGeneratorSettings);
        }

        let allKeys = Object.keys(allTaskDictForTaskGeneratorSettings);
        let randomKey = allKeys[Math.floor(Math.random() * allKeys.length)];
        return allTaskDictForTaskGeneratorSettings[randomKey];
    }

    static isMultipleOfTen(number: number) {
        return number % 10 === 0;
    }

}
