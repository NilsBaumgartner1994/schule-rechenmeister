import React from "react";
import {AdditionTaskGenerator} from "./../helper/AdditionTaskGenerator";
import {View} from "@/components/Themed";
import {TaskTemplate} from "@/components/TaskTemplate";
import {Href, useGlobalSearchParams} from "expo-router";
import {
    AdditionAndSubtractionGameDifficulty,
    AdditionAndSubtractionGameProps
} from "@/app/(app)/games/additionAndSubtraction";
import {SubtractionTaskGenerator} from "@/app/(app)/games/additionAndSubtraction/helper/SubtractionTaskGenerator";


export function getRouteToAdditionAndSubtractionWithInput(params: AdditionAndSubtractionGameProps): Href<string | object>{
    let paramsEncoded = "";
    let keys = Object.keys(params);
    for(let key of keys){
        // @ts-ignore
        let value = params?.[key];
        paramsEncoded += ""+encodeURIComponent(key)+"="+encodeURIComponent(value)+"&"
    }
    // @ts-ignore
    return "(app)/games/additionAndSubtraction/gameWithInput"+"?"+paramsEncoded
}

// New type with all booleans transformed into strings
type BooleanAndNumberToString<T> = {
    [K in keyof T]: T[K] extends boolean | number ? string : T[K];
}

// Applying the transformation
type AdditionAndSubtractionGamePropsWithStrings = BooleanAndNumberToString<AdditionAndSubtractionGameProps>;



export default function TabOneScreen() {

    const params = useGlobalSearchParams<AdditionAndSubtractionGamePropsWithStrings>();


    function generateTaskWithSolution(){
        const maxNumber = params.max
        const isAddition = params.addition === "true"
        const isSubtraction = params.subtraction === "true"
        const difficulty = params.difficulty;

        if(isAddition && !isSubtraction){
            switch (difficulty) {
                case AdditionAndSubtractionGameDifficulty.EASY: return AdditionTaskGenerator.generateEasy(maxNumber);
                case AdditionAndSubtractionGameDifficulty.MEDIUM: return AdditionTaskGenerator.generateMedium(maxNumber);
                case AdditionAndSubtractionGameDifficulty.HARD: return AdditionTaskGenerator.generateHard(maxNumber);
            }
        }
        if(!isAddition && isSubtraction){
            switch (difficulty) {
                case AdditionAndSubtractionGameDifficulty.EASY: return SubtractionTaskGenerator.generateEasy(maxNumber);
                case AdditionAndSubtractionGameDifficulty.MEDIUM: return SubtractionTaskGenerator.generateMedium(maxNumber);
                case AdditionAndSubtractionGameDifficulty.HARD: return SubtractionTaskGenerator.generateHard(maxNumber);
            }
        }
        if(isAddition && isSubtraction){
            let possibleTasks: any[] = [];
            switch (difficulty) {
                case AdditionAndSubtractionGameDifficulty.EASY:
                    possibleTasks.push(AdditionTaskGenerator.generateEasy(maxNumber));
                    possibleTasks.push(SubtractionTaskGenerator.generateEasy(maxNumber));
                    break;
                case AdditionAndSubtractionGameDifficulty.MEDIUM:
                    possibleTasks.push(AdditionTaskGenerator.generateMedium(maxNumber));
                    possibleTasks.push(SubtractionTaskGenerator.generateMedium(maxNumber));
                    break;
                case AdditionAndSubtractionGameDifficulty.HARD:
                    possibleTasks.push(AdditionTaskGenerator.generateHard(maxNumber));
                    possibleTasks.push(SubtractionTaskGenerator.generateHard(maxNumber));
                    break;
            }

            return possibleTasks[Math.floor(Math.random() * possibleTasks.length)];
        }
        return AdditionTaskGenerator.generateEasy(maxNumber);
    }

    return (
        <View style={{width: "100%", height: "100%"}}>
            <TaskTemplate generateTaskWithSolution={generateTaskWithSolution} />
        </View>
    );
}