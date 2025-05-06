import React from "react";
import {Heading, View} from "@/components/Themed";
import {MyScrollView} from "@/components/scrollview/MyScrollView";
import {GridList} from "@/components/GridList";
import {renderGameTypeCard} from "@/app/(app)/games/additionAndSubtraction/gameWithInput";
import {GameTypeCardStars} from "@/components/card/GameTypeCardStars";

export function getRouteToAdditionAndSubtractionUpTo100WithCarryOver(){
    return "/(app)/games/additionAndSubtraction/upTo100/withCarryOver";
}

export default function TabOneScreen() {

    const COLOR_EASY = "#d9ead3";
    const COLOR_MEDIUM = "#fff2cc";
    const COLOR_HARD = "#f4cccc";

    const amountColumns = 2

    function renderStars(amount: number, difficulty: string){
        return <GameTypeCardStars numberStars={amount} description={difficulty} />
    }

    function renderTasks(){
        let output = [];

        let names = ["Addition (+)", "Subtraktion (–)", "Mix (+,–)"];

        for (let i = 0; i < names.length; i++){
            let name = names[i];
            let addition = name.includes("+")
            let subtraction = name.includes("–")

            output.push(renderGameTypeCard(name, {
                addition: addition,
                subtraction: subtraction,
                taskGeneratorSettings: {
                    firstNumberNumberMin: 10,
                    firstNumberNumberMax: 100,
                    firstNumberAllowedMultipleOfTen: true,
                    secondNumberNumberMin: 1,
                    secondNumberNumberMax: 9,
                    secondNumberAllowedMultipleOfTen: false,
                    solutionMinInclusive: 1,
                    solutionMaxInclusive: 100,
                    solutionAllowedMultipleOfTen: false,
                    includeTasksWithCarryOver: true,
                    includeTasksWithoutCarryOver: false,
                }
            }, renderStars(1, "Einfach"), COLOR_EASY))
            output.push(renderGameTypeCard(name, {
                addition: addition,
                subtraction: subtraction,
                taskGeneratorSettings: {
                    firstNumberNumberMin: 10,
                    firstNumberNumberMax: 100,
                    firstNumberAllowedMultipleOfTen: false,
                    secondNumberNumberMin: 10,
                    secondNumberNumberMax: 100,
                    secondNumberAllowedMultipleOfTen: false,
                    solutionMinInclusive: 1,
                    solutionMaxInclusive: 100,
                    solutionAllowedMultipleOfTen: false,
                    includeTasksWithCarryOver: true,
                    includeTasksWithoutCarryOver: false,
                }
            }, renderStars(2, "Schwer"), COLOR_HARD))
        }
        return output;
    }

  return (
    <View style={{width: "100%", height: "100%"}}>
        <MyScrollView>
            <View style={{width: "100%", alignItems: "center"}}><Heading>{"Wähle dein Spiel"}</Heading></View>
            <View style={{width: "100%", alignItems: "center"}}><Heading>{"Rechnen bis "+"100"}</Heading></View>
            <GridList paddingVertical={7} paddingHorizontal={5} amountColumns={amountColumns}>
                {renderTasks()}
            </GridList>
        </MyScrollView>
    </View>
  );
}
