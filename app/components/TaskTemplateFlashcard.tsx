import React, {FunctionComponent, useEffect, useState} from "react";
import {Icon, Text, TEXT_SIZE_2_EXTRA_LARGE, TEXT_SIZE_6_EXTRA_LARGE, View} from "@/components/Themed";
import {MyButton} from "@/components/buttons/MyButton";
import {GridList} from "@/components/GridList";
import {useCurrentPlayers} from "@/states/SynchedProfile";
import {AnimationDonkey} from "@/components/animations/AnimationDonkey";
import {AnimationCorrect} from "@/components/animations/AnimationCorrect";
import {AnimationWrong} from "@/components/animations/AnimationWrong";
import {useGameMode} from "@/states/SynchedGameMode";
import {TouchableOpacity} from "react-native";
import {MyTouchableOpacity} from "@/components/buttons/MyTouchableOpacity";

export type TaskWithSolutionType = {
    task: string;
    solution: number;
}

export type TaskTemplateProps = {
    currentTaskWithSolution: TaskWithSolutionType;
    next: () => void;
}

export const TaskTemplateFlashcard: FunctionComponent<TaskTemplateProps> = (props) => {

    const currentTaskWithSolution = props?.currentTaskWithSolution
    const COLOR_TASK = "#fff2cc";

    const [showSolution, setShowSolution] = useState(false);

    if(!currentTaskWithSolution){
        return null;
    }

    const task = currentTaskWithSolution?.task;
    const solution = currentTaskWithSolution?.solution;

    function renderTask() {

        return (
            <View>
                    <View style={{
                        width: "100%",
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: COLOR_TASK,
                        paddingHorizontal: "30px",
                        borderRadius: "20px"
                    }}>
                        <View style={{width: "100%", alignItems: "center", justifyContent: "center", flexDirection: "row"}}>
                            <Text size={TEXT_SIZE_6_EXTRA_LARGE} bold={true}>{task + " = "}</Text>
                        </View>
                    </View>
            </View>
        )
    }

    function handlePress() {
        if(showSolution){
            setShowSolution(false);
            props.next();
        } else {
            setShowSolution(true);
        }
    }

    function renderSolution() {
        const text = showSolution ? solution : "?";

        return (
            <View>
                <TouchableOpacity onPress={handlePress}>
                    <View style={{
                        width: "100%",
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: COLOR_TASK,
                        paddingHorizontal: "30px",
                        borderRadius: "20px"
                    }}>
                        <View style={{width: "100%", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                            <Text size={TEXT_SIZE_6_EXTRA_LARGE} bold={true}>{text}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

  return (
      <>
          <View style={{width: "100%", padding: "20px"}}>
              {renderTask()}
              <View style={{
                    width: "100%",
                    height: "20px"
              }}>

              </View>
              {renderSolution()}
          </View>
      </>
  );
}
