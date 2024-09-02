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

    static ALL_TASK_WITHOUT_TEN_TRANSISTION_BY_MAX_NUMBER = {}
    static ALL_TASK_LIST_WITHOUT_TEN_TRANSISTION_BY_MAX_NUMBER = {}

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
            console.log("generateWithTenTransition: allTaskDict === undefined");
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
                        //console.log("OK firstNumberOne: " + firstNumberOne + " secondNumberOne: " + secondNumberOne);
                        const higherNumber = firstNumber > secondNumber ? firstNumber : secondNumber;
                        const lowerNumber = firstNumber > secondNumber ? secondNumber : firstNumber;
                        let key = higherNumber + "+" + lowerNumber;
                        allTaskDict[key] = {
                            higherNumber: higherNumber,
                            lowerNumber: lowerNumber,
                        }
                    } else {
                        //console.log("NO firstNumberOne: " + firstNumberOne + " secondNumberOne: " + secondNumberOne);
                    }
                }
            }
            AdditionBaseTaskGenerator.ALL_TASK_WITHOUT_TEN_TRANSISTION_BY_MAX_NUMBER[maxAsNumber] = allTaskDict;
            let keys = Object.keys(allTaskDict);
            AdditionBaseTaskGenerator.ALL_TASK_LIST_WITHOUT_TEN_TRANSISTION_BY_MAX_NUMBER[maxAsNumber] = keys;
        } else {
            //console.log("generateWithTenTransition: allTaskDict !== undefined");
        }

        let allKeys = AdditionBaseTaskGenerator.ALL_TASK_LIST_WITHOUT_TEN_TRANSISTION_BY_MAX_NUMBER[maxAsNumber]
        let randomKey = allKeys[Math.floor(Math.random() * allKeys.length)];
        let task = allTaskDict[randomKey];
        const higherNumber = task.higherNumber;
        const lowerNumber = task.lowerNumber;



        /**
        const firstNumberTen = AdditionBaseTaskGenerator.generateNumberFromTo(0, maxTen); // highest ==> 19
        const firstNumberOne = AdditionBaseTaskGenerator.generateNumberFromTo(1, 9);
        const firstNumber = firstNumberTen * 10 + firstNumberOne;
        const secondNumberTen = AdditionBaseTaskGenerator.generateNumberFromTo(0, maxTen-firstNumberTen);
        let secondNumberOne = AdditionBaseTaskGenerator.generateNumberFromTo(1, 9-firstNumberOne+1); // allow to become 10
        const secondNumber = secondNumberTen * 10 + secondNumberOne;

        const higherNumber = firstNumber > secondNumber ? firstNumber : secondNumber;
        const lowerNumber = firstNumber > secondNumber ? secondNumber : firstNumber;
         */

        taskWithSolution.higherNumber = higherNumber;
        taskWithSolution.lowerNumber = lowerNumber;
        taskWithSolution.solution = higherNumber + lowerNumber;

        return taskWithSolution;
    }

    static isMultipleOfTen(number: number) {
        return number % 10 === 0;
    }

    static hasTenTransition(solution: any, firstNumber: any) {
        // solution = 33 firstNumber = 3 would have no ten transition
        // solution = 49 firstNumber = 3 would have no ten transition
        const solutionOne = solution % 10; // eg. 5
        const firstNumberOne = firstNumber % 10; // eg. 3
        return firstNumberOne > solutionOne;
    }

    static ALL_TASK_WITH_TEN_TRANSISTION_BY_MAX_NUMBER = {}
    static ALL_TASK_LIST_WITH_TEN_TRANSISTION_BY_MAX_NUMBER = {}

    static generateWithTenTransition(maxNumber: any) {
        let taskWithSolution = {
            higherNumber: 0,
            lowerNumber: 0,
            solution: 0
        }

        let maxAsNumber = AdditionBaseTaskGenerator.getMaxNumber(maxNumber);

        let allTaskDict = AdditionBaseTaskGenerator.ALL_TASK_WITH_TEN_TRANSISTION_BY_MAX_NUMBER[maxAsNumber];
        if (allTaskDict === undefined) {
            console.log("generateWithTenTransition: allTaskDict === undefined");
            allTaskDict = {};
            for(let firstNumber = 1; firstNumber < maxAsNumber; firstNumber++) {
                let firstNumberOne = firstNumber % 10;
                for(let secondNumber = 1; secondNumber < (maxAsNumber-firstNumber+1); secondNumber++) {
                    let secondNumberOne = secondNumber % 10;
                    if(
                        !AdditionBaseTaskGenerator.isMultipleOfTen(firstNumber) &&
                        !AdditionBaseTaskGenerator.isMultipleOfTen(secondNumber) &&
                        firstNumberOne+secondNumberOne >= 10 &&
                        firstNumber+secondNumber <= maxAsNumber
                    ) {
                        //console.log("OK firstNumberOne: " + firstNumberOne + " secondNumberOne: " + secondNumberOne);
                        const higherNumber = firstNumber > secondNumber ? firstNumber : secondNumber;
                        const lowerNumber = firstNumber > secondNumber ? secondNumber : firstNumber;
                        let key = higherNumber + "+" + lowerNumber;
                        allTaskDict[key] = {
                            higherNumber: higherNumber,
                            lowerNumber: lowerNumber,
                        }
                    } else {
                        //console.log("NO firstNumberOne: " + firstNumberOne + " secondNumberOne: " + secondNumberOne);
                    }
                }
            }
            AdditionBaseTaskGenerator.ALL_TASK_WITH_TEN_TRANSISTION_BY_MAX_NUMBER[maxAsNumber] = allTaskDict;
            let keys = Object.keys(allTaskDict);
            AdditionBaseTaskGenerator.ALL_TASK_LIST_WITH_TEN_TRANSISTION_BY_MAX_NUMBER[maxAsNumber] = keys;
        } else {
            //console.log("generateWithTenTransition: allTaskDict !== undefined");
        }

        let allKeys = AdditionBaseTaskGenerator.ALL_TASK_LIST_WITH_TEN_TRANSISTION_BY_MAX_NUMBER[maxAsNumber]
        let randomKey = allKeys[Math.floor(Math.random() * allKeys.length)];
        let task = allTaskDict[randomKey];
        const higherNumber = task.higherNumber;
        const lowerNumber = task.lowerNumber;

        /**
         * Scheint alles gleich wahrscheinlich zu sein, sowohl Lösung als auch einzelne Zahlen
         */
        /**
        let firstNumber = AdditionBaseTaskGenerator.generateNumberFromTo(1, maxAsNumber-1); // -1 because we dont want to have firstNumber 0
        let secondNumber = AdditionBaseTaskGenerator.generateNumberFromTo(1, maxAsNumber-1);
        let firstNumberOne = firstNumber % 10;
        let secondNumberOne = secondNumber % 10;
        while(AdditionBaseTaskGenerator.isMultipleOfTen(firstNumber) || AdditionBaseTaskGenerator.isMultipleOfTen(secondNumber) || firstNumberOne+secondNumberOne < 10 || firstNumber+secondNumber > maxAsNumber) {
            firstNumber = AdditionBaseTaskGenerator.generateNumberFromTo(1, maxAsNumber-1); // -1 because we dont want to have firstNumber 0
            secondNumber = AdditionBaseTaskGenerator.generateNumberFromTo(1, maxAsNumber-1);
            firstNumberOne = firstNumber % 10;
            secondNumberOne = secondNumber % 10;
        }
        const solution = firstNumber + secondNumber;

         const higherNumber = firstNumber > secondNumber ? firstNumber : secondNumber;
         const lowerNumber = firstNumber > secondNumber ? secondNumber : firstNumber;
        */


        taskWithSolution.higherNumber = higherNumber;
        taskWithSolution.lowerNumber = lowerNumber;
        taskWithSolution.solution = higherNumber + lowerNumber;

        return taskWithSolution;
    }

    static ALL_TASK_WITH_SINGLE_TEN_TRANSISTION_BY_MAX_NUMBER = {}
    static ALL_TASK_LIST_WITH_SINGLE_TEN_TRANSISTION_BY_MAX_NUMBER = {}

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
            console.log("generateWithTenTransition: allTaskDict === undefined");
            allTaskDict = {};
            for(let firstNumber = 1; firstNumber < maxAsNumber; firstNumber++) {
                let firstNumberOne = firstNumber % 10;
                for(let secondNumber = 1; secondNumber <= 9; secondNumber++) {
                    let secondNumberOne = secondNumber % 10;
                    if(
                        !AdditionBaseTaskGenerator.isMultipleOfTen(firstNumber) &&
                        !AdditionBaseTaskGenerator.isMultipleOfTen(secondNumber) &&
                        firstNumberOne+secondNumberOne >= 10 &&
                        firstNumber+secondNumber <= maxAsNumber
                    ) {
                        //console.log("OK firstNumberOne: " + firstNumberOne + " secondNumberOne: " + secondNumberOne);
                        const higherNumber = firstNumber > secondNumber ? firstNumber : secondNumber;
                        const lowerNumber = firstNumber > secondNumber ? secondNumber : firstNumber;
                        let key = firstNumber + "+" + secondNumber;
                        allTaskDict[key] = {
                            higherNumber: higherNumber,
                            lowerNumber: lowerNumber,
                            firstNumber: firstNumber,
                            secondNumber: secondNumber
                        }
                    } else {
                        //console.log("NO firstNumberOne: " + firstNumberOne + " secondNumberOne: " + secondNumberOne);
                    }
                }
            }
            AdditionBaseTaskGenerator.ALL_TASK_WITH_SINGLE_TEN_TRANSISTION_BY_MAX_NUMBER[maxAsNumber] = allTaskDict;
            let keys = Object.keys(allTaskDict);
            AdditionBaseTaskGenerator.ALL_TASK_LIST_WITH_SINGLE_TEN_TRANSISTION_BY_MAX_NUMBER[maxAsNumber] = keys;
        } else {
            //console.log("generateWithTenTransition: allTaskDict !== undefined");
        }

        let allKeys = AdditionBaseTaskGenerator.ALL_TASK_LIST_WITH_SINGLE_TEN_TRANSISTION_BY_MAX_NUMBER[maxAsNumber]
        let randomKey = allKeys[Math.floor(Math.random() * allKeys.length)];
        let task = allTaskDict[randomKey];
        const higherNumber = task.higherNumber;
        const lowerNumber = task.lowerNumber;
        const firstNumber = task.firstNumber;
        const secondNumber = task.secondNumber;


        /**
        let solution = AdditionBaseTaskGenerator.generateNumberFromTo(10, maxAsNumber);
        let secondNumber = AdditionBaseTaskGenerator.generateNumberFromTo(1, 9); // -1 because we dont want to have secondNumber 0
        let firstNumber = solution - secondNumber;

        const higherNumber = firstNumber > secondNumber ? firstNumber : secondNumber;
        const lowerNumber = firstNumber > secondNumber ? secondNumber : firstNumber;
         */

        taskWithSolution.higherNumber = higherNumber;
        taskWithSolution.lowerNumber = lowerNumber;
        taskWithSolution.firstNumber = firstNumber;
        taskWithSolution.secondNumber = secondNumber;
        taskWithSolution.solution = firstNumber + secondNumber;

        return taskWithSolution;
    }
}
