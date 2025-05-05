import React from "react";
import {Heading, View} from "@/components/Themed";
import {MyScrollView} from "@/components/scrollview/MyScrollView";
import {GridList} from "@/components/GridList";
import {renderGameTypeCard} from "@/app/(app)/games/additionAndSubtraction/gameWithInput";
import {GameTypeCardStars} from "@/components/card/GameTypeCardStars";

export function getRouteToAdditionAndSubtractionUpTo20(){
    return "/(app)/games/additionAndSubtraction/upTo20";
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

        output.push(renderGameTypeCard("Addition (+)", {
            addition: true,
            subtraction: false,
            taskGeneratorSettings: {
                firstNumberNumberMin: 1,
                firstNumberNumberMax: 20,
                firstNumberAllowedMultipleOfTen: false,
                secondNumberNumberMin: 1,
                secondNumberNumberMax: 20,
                secondNumberAllowedMultipleOfTen: false,
                solutionMinInclusive: 1,
                solutionMaxInclusive: 20,
                solutionAllowedMultipleOfTen: false,
                includeTasksWithCarryOver: false,
                includeTasksWithoutCarryOver: true,
            }
        }, renderStars(1, "einfach"), COLOR_EASY))
        output.push(renderGameTypeCard("Addition (+)", {
            addition: true,
            subtraction: false,
            taskGeneratorSettings: {
                firstNumberNumberMin: 1,
                firstNumberNumberMax: 20,
                firstNumberAllowedMultipleOfTen: false,
                secondNumberNumberMin: 1,
                secondNumberNumberMax: 20,
                secondNumberAllowedMultipleOfTen: false,
                solutionMinInclusive: 1,
                solutionMaxInclusive: 20,
                solutionAllowedMultipleOfTen: false,
                includeTasksWithCarryOver: true,
                includeTasksWithoutCarryOver: false,
            }
        }, renderStars(2, "schwer"), COLOR_HARD))
        output.push(renderGameTypeCard("Subtraktion (–)", {
            addition: false,
            subtraction: true,
            taskGeneratorSettings: {
                firstNumberNumberMin: 1,
                firstNumberNumberMax: 20,
                firstNumberAllowedMultipleOfTen: false,
                secondNumberNumberMin: 1,
                secondNumberNumberMax: 20,
                secondNumberAllowedMultipleOfTen: false,
                solutionMinInclusive: 1,
                solutionMaxInclusive: 20,
                solutionAllowedMultipleOfTen: false,
                includeTasksWithCarryOver: false,
                includeTasksWithoutCarryOver: true,
            }
        }, renderStars(1, "einfach"), COLOR_EASY))
        output.push(renderGameTypeCard("Subtraktion (–)", {
            addition: false,
            subtraction: true,
            taskGeneratorSettings: {
                firstNumberNumberMin: 1,
                firstNumberNumberMax: 20,
                firstNumberAllowedMultipleOfTen: false,
                secondNumberNumberMin: 1,
                secondNumberNumberMax: 20,
                secondNumberAllowedMultipleOfTen: false,
                solutionMinInclusive: 1,
                solutionMaxInclusive: 20,
                solutionAllowedMultipleOfTen: false,
                includeTasksWithCarryOver: true,
                includeTasksWithoutCarryOver: false,
            }
        }, renderStars(2, "schwer"), COLOR_HARD))
        output.push(renderGameTypeCard("Mix (+,–)", {
            addition: true,
            subtraction: true,
            taskGeneratorSettings: {
                firstNumberNumberMin: 1,
                firstNumberNumberMax: 20,
                firstNumberAllowedMultipleOfTen: false,
                secondNumberNumberMin: 1,
                secondNumberNumberMax: 20,
                secondNumberAllowedMultipleOfTen: false,
                solutionMinInclusive: 1,
                solutionMaxInclusive: 20,
                solutionAllowedMultipleOfTen: false,
                includeTasksWithCarryOver: false,
                includeTasksWithoutCarryOver: true,
            }
        }, renderStars(1, "einfach"), COLOR_EASY))
        output.push(renderGameTypeCard("Mix (+,–)", {
            addition: true,
            subtraction: true,
            taskGeneratorSettings: {
                firstNumberNumberMin: 1,
                firstNumberNumberMax: 20,
                firstNumberAllowedMultipleOfTen: false,
                secondNumberNumberMin: 1,
                secondNumberNumberMax: 20,
                secondNumberAllowedMultipleOfTen: false,
                solutionMinInclusive: 1,
                solutionMaxInclusive: 20,
                solutionAllowedMultipleOfTen: false,
                includeTasksWithCarryOver: true,
                includeTasksWithoutCarryOver: false,
            }
        }, renderStars(2, "schwer"), COLOR_HARD))

        return output;
    }

  return (
    <View style={{width: "100%", height: "100%"}}>
        <MyScrollView>
            <View style={{width: "100%", alignItems: "center"}}><Heading>{"Wähle dein Spiel"}</Heading></View>
            <View style={{width: "100%", alignItems: "center"}}><Heading>{"Rechnen bis "+"20"}</Heading></View>
            <GridList paddingVertical={7} paddingHorizontal={5} amountColumns={amountColumns}>
                {renderTasks()}
            </GridList>
        </MyScrollView>
    </View>
  );
}
