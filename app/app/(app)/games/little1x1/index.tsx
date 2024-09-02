import React from "react";
import {Heading, Icon, View} from "@/components/Themed";
import {MyScrollView} from "@/components/scrollview/MyScrollView";
import {MyTouchableOpacity} from "@/components/buttons/MyTouchableOpacity";
import {GridList} from "@/components/GridList";
import {useMyContrastColor} from "@/helper/color/MyContrastColor";
import {router} from "expo-router";
import {getRouteToMultiplicationAndDivisionWithInput} from "@/app/(app)/games/little1x1/gameWithInput";


export type MultiplicationAndDivisionGameProps = {
    coretasks: boolean;
    multiplication: boolean;
    division: boolean;
}

export function getRouteToMultiplicationAndDivisionIndex(){
    return "/(app)/games/little1x1/"
}

export default function TabOneScreen() {

    const COLOR_EASY = "#d9ead3";
    const COLOR_MEDIUM = "#fff2cc";
    const COLOR_HARD = "#f4cccc";

    function renderGameType(name: string, description: string, gameType: MultiplicationAndDivisionGameProps, level: JSX.Element, color: string){
        const colorContrast = useMyContrastColor(color);

        return (
            <MyTouchableOpacity accessibilityLabel={name} style={{borderColor: "black", borderWidth: 1, borderRadius: 5, overflow: "hidden"}} onPress={() => {
                router.push(getRouteToMultiplicationAndDivisionWithInput(gameType));
            }}>
                <View style={{
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "20px",
                    backgroundColor: color
                }}>
                    <Heading style={{
                        color: colorContrast
                    }}>{name}</Heading>
                    <Heading style={{
                        color: colorContrast
                    }}>{description}</Heading>
                </View>
                {level}
            </MyTouchableOpacity>
        );
    }

    const amountColumns = 2;

    function renderStars(amount: number, difficulty: string){

        let stars = [];
        for(let i = 0; i < amount; i++){
            stars.push(<Icon name="star" color="#FFD700" />);
        }

        return (
            <View style={{alignItems: "center", justifyContent: "center"}}>
                <Heading>{difficulty}</Heading>
                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                    {stars}
                </View>
            </View>
        );
    }

    function renderTasks(){
        let output = [];
        output.push(renderGameType("Multiplikation (⋅)", "Kernaufgaben", {
            coretasks: true,
            multiplication: true,
            division: false
        }, renderStars(1, ""), COLOR_EASY))
        output.push(renderGameType("Multiplikation (⋅)", "Alle Aufgaben", {
            coretasks: false,
            multiplication: true,
            division: false
        }, renderStars(2, ""), COLOR_HARD))
        output.push(renderGameType("Division ( : )", "Kernaufgaben", {
            coretasks: true,
            multiplication: false,
            division: true
        }, renderStars(1, ""), COLOR_EASY))
        output.push(renderGameType("Division ( : )", "Alle Aufgaben", {
            coretasks: false,
            multiplication: false,
            division: true
        }, renderStars(2, ""), COLOR_HARD))
        output.push(renderGameType("Mix (⋅, : )", "Kernaufgaben", {
            coretasks: true,
            multiplication: true,
            division: true
        }, renderStars(1, ""), COLOR_EASY))
        output.push(renderGameType("Mix (⋅, : )", "Alle Aufgaben", {
            coretasks: false,
            multiplication: true,
            division: true
        }, renderStars(2, ""), COLOR_HARD))
        return output;
    }

    return (
        <View style={{width: "100%", height: "100%"}}>
            <MyScrollView>
                <View style={{width: "100%", alignItems: "center"}}><Heading>{"Wähle dein Spiel"}</Heading></View>
                <GridList paddingVertical={20} paddingHorizontal={20} amountColumns={amountColumns}>
                    {renderTasks()}
                </GridList>
            </MyScrollView>
        </View>
    );
}
