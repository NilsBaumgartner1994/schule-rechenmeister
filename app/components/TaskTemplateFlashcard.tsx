import React, {FunctionComponent, useState} from "react";
import {Text, TEXT_SIZE_2_EXTRA_LARGE, TEXT_SIZE_6_EXTRA_LARGE, View} from "@/components/Themed";
import {TouchableOpacity} from "react-native";
import {useMyContrastColor} from "@/helper/color/MyContrastColor";

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
    const textColor = useMyContrastColor(COLOR_TASK);

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
                            <Text style={{
                                color: textColor
                            }} size={TEXT_SIZE_6_EXTRA_LARGE} bold={true}>{task + " = "}</Text>
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
        const textOnPress = showSolution ? "Nächste Aufgabe" : "Lösung anzeigen";

        return (
            <View>
                <TouchableOpacity onPress={handlePress}>
                    <View style={{
                        width: "100%",
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: COLOR_TASK,
                        paddingHorizontal: "30px",
                        borderWidth: "2px",
                        borderColor: textColor,
                        borderRadius: "20px"
                    }}>
                        <View style={{width: "100%", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                            <Text style={{
                                color: textColor
                            }} size={TEXT_SIZE_6_EXTRA_LARGE} bold={true}>{text}</Text>
                            <Text style={{
                                color: textColor
                            }} size={TEXT_SIZE_2_EXTRA_LARGE} bold={true}>{textOnPress}</Text>
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
