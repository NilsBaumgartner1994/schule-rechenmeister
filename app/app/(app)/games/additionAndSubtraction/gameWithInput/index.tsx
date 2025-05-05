import React from "react";
import {AdditionTaskGenerator} from "../helper/AdditionTaskGenerator";
import {View} from "@/components/Themed";
import {TaskTemplate} from "@/components/TaskTemplate";
import {Href, router, useGlobalSearchParams} from "expo-router";
import {
    AdditionAndSubtractionGameProps
} from "@/app/(app)/games/additionAndSubtraction";
import {SubtractionTaskGenerator} from "@/app/(app)/games/additionAndSubtraction/helper/SubtractionTaskGenerator";
import {AdditionTaskGeneratorSettings} from "@/app/(app)/games/additionAndSubtraction/helper/AdditionBaseTaskGenerator";
import {GameTypeCard} from "@/components/card/GameTypeCard";

export function renderGameTypeCard(name: string, gameType: AdditionAndSubtractionGameProps, description: JSX.Element, color: string){
    const onPress = () => {
        router.push(getRouteToAdditionAndSubtractionWithInput(gameType));
    }

    return <GameTypeCard name={name} description={description} color={color} onPress={onPress} />
}

export function getRouteToAdditionAndSubtractionWithInput(params: AdditionAndSubtractionGameProps): Href<string | object>{
    let paramsEncoded = "";
    console.log("getRouteToAdditionAndSubtractionWithInput", params);
    let keys = Object.keys(params);
    for(let key of keys){
        // @ts-ignore
        let value = params?.[key];
        if(key === "taskGeneratorSettings"){
            // @ts-ignore
            value = JSON.stringify(value);
        }

        paramsEncoded += ""+encodeURIComponent(key)+"="+encodeURIComponent(value)+"&"
    }
    console.log("paramsEncoded", paramsEncoded);
    // @ts-ignore
    return "(app)/games/additionAndSubtraction/gameWithInput"+"?"+paramsEncoded
}

// New type with all booleans transformed into strings
type BooleanAndNumberToString<T> = {
    [K in keyof T]: T[K] extends boolean | number | AdditionTaskGeneratorSettings ? string : T[K];
}

// Applying the transformation
type AdditionAndSubtractionGamePropsWithStrings = BooleanAndNumberToString<AdditionAndSubtractionGameProps>;



export default function TabOneScreen() {

    const params = useGlobalSearchParams<AdditionAndSubtractionGamePropsWithStrings>();


    function generateTaskWithSolution(){
        const isAddition = params.addition === "true"
        const isSubtraction = params.subtraction === "true"
        const taskGeneratorSettingsRaw = params.taskGeneratorSettings;
        let taskGeneratorSettings: AdditionTaskGeneratorSettings = JSON.parse(taskGeneratorSettingsRaw);

        if(isAddition && !isSubtraction){
            return AdditionTaskGenerator.generateTask(taskGeneratorSettings);
        }
        if(!isAddition && isSubtraction){
            return SubtractionTaskGenerator.generateTask(taskGeneratorSettings);
        }
        if(isAddition && isSubtraction){
            let possibleTasks: any[] = [];
            possibleTasks.push(AdditionTaskGenerator.generateTask(taskGeneratorSettings));
            possibleTasks.push(SubtractionTaskGenerator.generateTask(taskGeneratorSettings));

            return possibleTasks[Math.floor(Math.random() * possibleTasks.length)];
        }
        return AdditionTaskGenerator.generateTask(taskGeneratorSettings);
    }

    return (
        <View style={{width: "100%", height: "100%"}}>
            <TaskTemplate generateTaskWithSolution={generateTaskWithSolution} />
        </View>
    );
}