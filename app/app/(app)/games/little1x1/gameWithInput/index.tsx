import React from "react";
import {View} from "@/components/Themed";
import {TaskTemplate} from "@/components/TaskTemplate";
import {Href, useGlobalSearchParams} from "expo-router";
import {MultiplicationAndDivisionGameProps} from "@/app/(app)/games/little1x1";
import {DivisionTaskGenerator} from "@/app/(app)/games/little1x1/helper/DivisionTaskGenerator";
import {MultiplicationTaskGenerator} from "@/app/(app)/games/little1x1/helper/MultiplicationTaskGenerator";


export function getRouteToMultiplicationAndDivisionWithInput(params: MultiplicationAndDivisionGameProps): Href<string | object>{
    let paramsEncoded = "";
    let keys = Object.keys(params);
    for(let key of keys){
        let value = params?.[key];
        paramsEncoded += ""+encodeURIComponent(key)+"="+encodeURIComponent(value)+"&"
    }
    return "(app)/games/little1x1/gameWithInput"+"?"+paramsEncoded
}

// New type with all booleans transformed into strings
type BooleanAndNumberToString<T> = {
    [K in keyof T]: T[K] extends boolean | number ? string : T[K];
}

// Applying the transformation
type MultiplicationAndDivisionGamePropsWithStrings = BooleanAndNumberToString<MultiplicationAndDivisionGameProps>;



export default function TabOneScreen() {

    const params = useGlobalSearchParams<MultiplicationAndDivisionGamePropsWithStrings>();


    function generateTaskWithSolution(){
        const isMultiplication = params.multiplication === "true"
        const isDivision = params.division === "true"
        const isCoreTasks = params.coretasks === "true"

        if(isMultiplication && !isDivision){
            if(isCoreTasks){
                return MultiplicationTaskGenerator.generateCoreTask()
            } else {
                return MultiplicationTaskGenerator.generateAllTaskWithoutEasyOnes()
            }
        }
        if(!isMultiplication && isDivision){
            if(isCoreTasks){
                return DivisionTaskGenerator.generateCoreTask()
            } else {
                return DivisionTaskGenerator.generateAllTaskWithoutEasyOnes()
            }
        }
        if(isMultiplication && isDivision){
            if(isCoreTasks){
                let possibleTasks = [
                    MultiplicationTaskGenerator.generateCoreTask(),
                    DivisionTaskGenerator.generateCoreTask()
                ];
                return possibleTasks[Math.floor(Math.random() * possibleTasks.length)];
            } else {
                let possibleTasks = [
                    MultiplicationTaskGenerator.generateAllTaskWithoutEasyOnes(),
                    DivisionTaskGenerator.generateAllTaskWithoutEasyOnes()
                ];
                return possibleTasks[Math.floor(Math.random() * possibleTasks.length)];
            }
        }
        return MultiplicationTaskGenerator.generateCoreTask()
    }

    return (
        <View style={{width: "100%", height: "100%"}}>
            <TaskTemplate generateTaskWithSolution={generateTaskWithSolution} />
        </View>
    );
}