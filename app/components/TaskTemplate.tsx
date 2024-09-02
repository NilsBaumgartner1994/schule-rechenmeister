import React, {FunctionComponent, useState} from "react";
import {GameMode, useGameMode} from "@/states/SynchedGameMode";
import {TaskTemplatePlayers} from "@/components/TaskTemplatePlayers";
import {TaskTemplateFlashcard} from "@/components/TaskTemplateFlashcard";

export type TaskWithSolutionType = {
    task: string;
    solution: number;
}

export type TaskTemplateProps = {
    generateTaskWithSolution?: () => TaskWithSolutionType;
}

export const TaskTemplate: FunctionComponent<TaskTemplateProps> = (props) => {

    const [gameMode, setGameMode] = useGameMode()

    const defaultGenerateTask = () => {
        return {
            task: "5+5",
            solution: 10,
        }
    }

    const useGenerateTaskFun = props?.generateTaskWithSolution || defaultGenerateTask;

    const [currentTaskWithSolution, setCurrentTaskWithSolution] = useState(useGenerateTaskFun);

    if(!currentTaskWithSolution){
        return null;
    }

    if(gameMode === GameMode.FLASHCARDS){
        return <TaskTemplateFlashcard currentTaskWithSolution={JSON.parse(JSON.stringify(currentTaskWithSolution))} next={() => {
            setCurrentTaskWithSolution(useGenerateTaskFun());
        }} />
    }
    if(gameMode === GameMode.PLAYERS){
        return <TaskTemplatePlayers currentTaskWithSolution={JSON.parse(JSON.stringify(currentTaskWithSolution))} next={() => {
            setCurrentTaskWithSolution(useGenerateTaskFun());
        }} />
    }
    return null;

}
