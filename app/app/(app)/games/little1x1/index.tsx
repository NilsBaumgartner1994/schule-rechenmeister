import React from "react";
import {Heading, Icon, useViewBackgroundColor, View} from "@/components/Themed";
import {MyScrollView} from "@/components/scrollview/MyScrollView";
import {MyTouchableOpacity} from "@/components/buttons/MyTouchableOpacity";
import {GridList} from "@/components/GridList";
import {useMyContrastColor} from "@/helper/color/MyContrastColor";
import {router} from "expo-router";
import {getRouteToMultiplicationAndDivisionWithInput} from "@/app/(app)/games/little1x1/gameWithInput";
import {GameTypeCard} from "@/components/card/GameTypeCard";
import {GameTypeCardStars} from "@/components/card/GameTypeCardStars";


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

    const viewBackgroundColor = useViewBackgroundColor();
    const viewContrastColor = useMyContrastColor(viewBackgroundColor);

    function renderStars(amount: number, difficulty: string){
        return <GameTypeCardStars numberStars={amount} description={difficulty} />
    }

    function renderGameType(name: string,gameType: MultiplicationAndDivisionGameProps,  description: JSX.Element, color: string){
        const colorContrast = useMyContrastColor(color);
        const onPress = () => {
            router.push(getRouteToMultiplicationAndDivisionWithInput(gameType));
        }

        return (
            <GameTypeCard name={name} description={description} color={color} onPress={onPress} />
        );
    }

    const amountColumns = 2;

    function renderTasks(){
        let output = [];
        output.push(renderGameType("Multiplikation (⋅)", {
            coretasks: true,
            multiplication: true,
            division: false
        }, renderStars(1, "Kernaufgaben"), COLOR_EASY))
        output.push(renderGameType("Multiplikation (⋅)", {
            coretasks: false,
            multiplication: true,
            division: false
        }, renderStars(2, "Alle Aufgaben"), COLOR_HARD))
        output.push(renderGameType("Division ( : )", {
            coretasks: true,
            multiplication: false,
            division: true
        }, renderStars(1, "Kernaufgaben"), COLOR_EASY))
        output.push(renderGameType("Division ( : )", {
            coretasks: false,
            multiplication: false,
            division: true
        }, renderStars(2, "Alle Aufgaben"), COLOR_HARD))
        output.push(renderGameType("Mix (⋅, : )", {
            coretasks: true,
            multiplication: true,
            division: true
        }, renderStars(1, "Kernaufgaben"), COLOR_EASY))
        output.push(renderGameType("Mix (⋅, : )", {
            coretasks: false,
            multiplication: true,
            division: true
        }, renderStars(2, "Alle Aufgaben"), COLOR_HARD))
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
