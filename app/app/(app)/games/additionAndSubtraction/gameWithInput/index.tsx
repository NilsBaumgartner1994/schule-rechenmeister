import React from "react";
import {AdditionTaskGenerator} from "./../helper/AdditionTaskGenerator";
import {Text, View} from "@/components/Themed";
import {TaskTemplate} from "@/components/TaskTemplate";
import {Href, useGlobalSearchParams} from "expo-router";
import {AdditionAndSubtractionGameProps} from "@/app/(app)/games/additionAndSubtraction";
import {SubtractionTaskGenerator} from "@/app/(app)/games/additionAndSubtraction/helper/SubtractionTaskGenerator";


export function getRouteToAdditionAndSubtractionWithInput(params: AdditionAndSubtractionGameProps): Href<string | object>{
    let paramsEncoded = "";
    let keys = Object.keys(params);
    for(let key of keys){
        let value = params?.[key];
        paramsEncoded += ""+encodeURIComponent(key)+"="+encodeURIComponent(value)+"&"
    }
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
        const isWithTenTransition = params.withTenTransition === "true"
        const isWithTenTransitionEasy = params.withTenTransitionEasy === "true"

        if(isAddition && !isSubtraction){
            if(isWithTenTransition){
                if(isWithTenTransitionEasy){
                    return AdditionTaskGenerator.generateWithTenTransitionSingleNumber(maxNumber);
                } else {
                    return AdditionTaskGenerator.generateWithTenTransition(maxNumber);
                }
            } else {
                return AdditionTaskGenerator.generateWithoutTenTransition(maxNumber);
            }
        }
        if(!isAddition && isSubtraction){
            if(isWithTenTransition){
                if(isWithTenTransitionEasy){
                    return SubtractionTaskGenerator.generateWithTenTransitionSingleNumber(maxNumber);
                } else {
                    return SubtractionTaskGenerator.generateWithTenTransition(maxNumber);
                }
            } else {
                return SubtractionTaskGenerator.generateWithoutTenTransition(maxNumber);
            }
        }
        if(isAddition && isSubtraction){
            if(isWithTenTransition){
                if(isWithTenTransitionEasy){
                    let possibleTasks = [
                        AdditionTaskGenerator.generateWithTenTransitionSingleNumber(maxNumber),
                        SubtractionTaskGenerator.generateWithTenTransitionSingleNumber(maxNumber)
                    ];
                    return possibleTasks[Math.floor(Math.random() * possibleTasks.length)];
                } else {
                    let possibleTasks = [
                        AdditionTaskGenerator.generateWithTenTransition(maxNumber),
                        SubtractionTaskGenerator.generateWithTenTransition(maxNumber)
                    ];
                    return possibleTasks[Math.floor(Math.random() * possibleTasks.length)];
                }
            } else {
                let possibleTasks = [
                    AdditionTaskGenerator.generateWithoutTenTransition(maxNumber),
                    SubtractionTaskGenerator.generateWithoutTenTransition(maxNumber)
                ];
                return possibleTasks[Math.floor(Math.random() * possibleTasks.length)];
            }
        }
        return AdditionTaskGenerator.generateWithoutTenTransition(maxNumber);
    }

    return (
        <View style={{width: "100%", height: "100%"}}>
            <TaskTemplate generateTaskWithSolution={generateTaskWithSolution} />
        </View>
    );
}