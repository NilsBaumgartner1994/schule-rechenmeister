import React from "react";

export class AdditionBaseTaskGenerator {

    static generateNumberFromTo(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static getMaxNumber(maxNumberString: any) {
        const maxNumber = parseInt(maxNumberString+"");
        return maxNumber;
    }

    static getMaxTen(maxNumberString: any) {
        const maxNumber = parseInt(maxNumberString+"");
        const maxTen = Math.floor((maxNumber-1)/10);
        return maxTen;
    }

    static ALL_TASK_WITHOUT_TEN_TRANSISTION_BY_MAX_NUMBER: any = {}
    static ALL_TASK_LIST_WITHOUT_TEN_TRANSISTION_BY_MAX_NUMBER: any = {}

    static generateWithoutTenTransition(maxNumber: any) {
        let taskWithSolution = {
            higherNumber: 0,
            lowerNumber: 0,
            solution: 0
        }

        const maxTen = AdditionBaseTaskGenerator.getMaxTen(maxNumber);
        let maxAsNumber = AdditionBaseTaskGenerator.getMaxNumber(maxNumber);

        let allTaskDict = AdditionBaseTaskGenerator.ALL_TASK_WITHOUT_TEN_TRANSISTION_BY_MAX_NUMBER[maxAsNumber];
        if (allTaskDict === undefined) {
            allTaskDict = {};
            for(let firstNumber = 1; firstNumber < maxAsNumber; firstNumber++) {
                let firstNumberOne = firstNumber % 10;
                for(let secondNumber = 1; secondNumber < (maxAsNumber-firstNumber+1); secondNumber++) {
                    let secondNumberOne = secondNumber % 10;
                    if(
                        !AdditionBaseTaskGenerator.isMultipleOfTen(firstNumber) &&
                        !AdditionBaseTaskGenerator.isMultipleOfTen(secondNumber) &&
                        firstNumberOne+secondNumberOne <= 10 &&
                        firstNumber+secondNumber <= maxAsNumber
                    ) {
                        const higherNumber = firstNumber > secondNumber ? firstNumber : secondNumber;
                        const lowerNumber = firstNumber > secondNumber ? secondNumber : firstNumber;
                        let key = higherNumber + "+" + lowerNumber;
                        allTaskDict[key] = {
                            higherNumber: higherNumber,
                            lowerNumber: lowerNumber,
                        }
                    }
                }
            }
            AdditionBaseTaskGenerator.ALL_TASK_WITHOUT_TEN_TRANSISTION_BY_MAX_NUMBER[maxAsNumber] = allTaskDict;
            let keys = Object.keys(allTaskDict);
            AdditionBaseTaskGenerator.ALL_TASK_LIST_WITHOUT_TEN_TRANSISTION_BY_MAX_NUMBER[maxAsNumber] = keys;
        }

        let allKeys = AdditionBaseTaskGenerator.ALL_TASK_LIST_WITHOUT_TEN_TRANSISTION_BY_MAX_NUMBER[maxAsNumber]
        let randomKey = allKeys[Math.floor(Math.random() * allKeys.length)];
        let task = allTaskDict[randomKey];
        const higherNumber = task.higherNumber;
        const lowerNumber = task.lowerNumber;

        taskWithSolution.higherNumber = higherNumber;
        taskWithSolution.lowerNumber = lowerNumber;
        taskWithSolution.solution = higherNumber + lowerNumber;

        return taskWithSolution;
    }

    static isMultipleOfTen(number: number) {
        return number % 10 === 0;
    }

    static ALL_TASK_WITH_TEN_TRANSISTION_BY_MAX_NUMBER: any = {}
    static ALL_TASK_LIST_WITH_TEN_TRANSISTION_BY_MAX_NUMBER: any = {}

    static generateWithTenTransition(maxNumber: any) {
        let taskWithSolution = {
            higherNumber: 0,
            lowerNumber: 0,
            solution: 0
        }

        let maxAsNumber = AdditionBaseTaskGenerator.getMaxNumber(maxNumber);

        let allTaskDict = AdditionBaseTaskGenerator.ALL_TASK_WITH_TEN_TRANSISTION_BY_MAX_NUMBER[maxAsNumber];
        if (allTaskDict === undefined) {
            const firstNumberPlusSecondNumberMinimumValue = 11;

            allTaskDict = {};
            for(let firstNumber = 1; firstNumber < maxAsNumber; firstNumber++) {
                let firstNumberOne = firstNumber % 10;
                for(let secondNumber = 1; secondNumber < (maxAsNumber-firstNumber+1); secondNumber++) {
                    let secondNumberOne = secondNumber % 10;
                    if(
                        !AdditionBaseTaskGenerator.isMultipleOfTen(firstNumber) &&
                        !AdditionBaseTaskGenerator.isMultipleOfTen(secondNumber) &&
                        firstNumberOne+secondNumberOne > firstNumberPlusSecondNumberMinimumValue &&
                        firstNumber+secondNumber <= maxAsNumber
                    ) {
                        const higherNumber = firstNumber > secondNumber ? firstNumber : secondNumber;
                        const lowerNumber = firstNumber > secondNumber ? secondNumber : firstNumber;
                        let key = higherNumber + "+" + lowerNumber;
                        allTaskDict[key] = {
                            higherNumber: higherNumber,
                            lowerNumber: lowerNumber,
                        }
                    }
                }
            }
            AdditionBaseTaskGenerator.ALL_TASK_WITH_TEN_TRANSISTION_BY_MAX_NUMBER[maxAsNumber] = allTaskDict;
            let keys = Object.keys(allTaskDict);
            AdditionBaseTaskGenerator.ALL_TASK_LIST_WITH_TEN_TRANSISTION_BY_MAX_NUMBER[maxAsNumber] = keys;
        }

        let allKeys = AdditionBaseTaskGenerator.ALL_TASK_LIST_WITH_TEN_TRANSISTION_BY_MAX_NUMBER[maxAsNumber]
        let randomKey = allKeys[Math.floor(Math.random() * allKeys.length)];
        let task = allTaskDict[randomKey];
        const higherNumber = task.higherNumber;
        const lowerNumber = task.lowerNumber;

        taskWithSolution.higherNumber = higherNumber;
        taskWithSolution.lowerNumber = lowerNumber;
        taskWithSolution.solution = higherNumber + lowerNumber;

        return taskWithSolution;
    }

    static ALL_TASK_WITH_SINGLE_TEN_TRANSISTION_BY_MAX_NUMBER: any = {}
    static ALL_TASK_LIST_WITH_SINGLE_TEN_TRANSISTION_BY_MAX_NUMBER: any = {}

    static generateWithTenTransitionSingleNumber(maxNumber: any) {
        let taskWithSolution = {
            higherNumber: 0,
            lowerNumber: 0,
            firstNumber: 0,
            secondNumber: 0,
            solution: 0
        }

        let maxAsNumber = AdditionBaseTaskGenerator.getMaxNumber(maxNumber);

        let allTaskDict = AdditionBaseTaskGenerator.ALL_TASK_WITH_SINGLE_TEN_TRANSISTION_BY_MAX_NUMBER[maxAsNumber];
        if (allTaskDict === undefined) {
            const firstNumberPlusSecondNumberMinimumValue = 11;
            allTaskDict = {};
            for(let firstNumber = 1; firstNumber < maxAsNumber; firstNumber++) {
                let firstNumberOne = firstNumber % 10;
                for(let secondNumber = 1; secondNumber <= 9; secondNumber++) {
                    let secondNumberOne = secondNumber % 10;
                    if(
                        !AdditionBaseTaskGenerator.isMultipleOfTen(firstNumber) &&
                        !AdditionBaseTaskGenerator.isMultipleOfTen(secondNumber) &&
                        firstNumberOne+secondNumberOne >= firstNumberPlusSecondNumberMinimumValue &&
                        firstNumber+secondNumber <= maxAsNumber
                    ) {
                        const higherNumber = firstNumber > secondNumber ? firstNumber : secondNumber;
                        const lowerNumber = firstNumber > secondNumber ? secondNumber : firstNumber;
                        let key = firstNumber + "+" + secondNumber;
                        allTaskDict[key] = {
                            higherNumber: higherNumber,
                            lowerNumber: lowerNumber,
                            firstNumber: firstNumber,
                            secondNumber: secondNumber
                        }
                    }
                }
            }
            AdditionBaseTaskGenerator.ALL_TASK_WITH_SINGLE_TEN_TRANSISTION_BY_MAX_NUMBER[maxAsNumber] = allTaskDict;
            let keys = Object.keys(allTaskDict);
            AdditionBaseTaskGenerator.ALL_TASK_LIST_WITH_SINGLE_TEN_TRANSISTION_BY_MAX_NUMBER[maxAsNumber] = keys;
        }

        let allKeys = AdditionBaseTaskGenerator.ALL_TASK_LIST_WITH_SINGLE_TEN_TRANSISTION_BY_MAX_NUMBER[maxAsNumber]
        let randomKey = allKeys[Math.floor(Math.random() * allKeys.length)];
        let task = allTaskDict[randomKey];
        const higherNumber = task.higherNumber;
        const lowerNumber = task.lowerNumber;
        const firstNumber = task.firstNumber;
        const secondNumber = task.secondNumber;

        taskWithSolution.higherNumber = higherNumber;
        taskWithSolution.lowerNumber = lowerNumber;
        taskWithSolution.firstNumber = firstNumber;
        taskWithSolution.secondNumber = secondNumber;
        taskWithSolution.solution = firstNumber + secondNumber;

        return taskWithSolution;
    }
}
