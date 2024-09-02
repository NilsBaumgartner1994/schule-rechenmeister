import React, {FunctionComponent} from "react";
import {Heading, Icon, View, Text, useViewBackgroundColor} from "@/components/Themed";
import {MyScrollView} from "@/components/scrollview/MyScrollView";
import {router, useGlobalSearchParams} from "expo-router";
import {MyTouchableOpacity} from "@/components/buttons/MyTouchableOpacity";
import {GridList} from "@/components/GridList";
import {useMyContrastColor} from "@/helper/color/MyContrastColor";
import {getRouteToAdditionAndSubtractionWithInput} from "@/app/(app)/games/additionAndSubtraction/gameWithInput";


export type AdditionAndSubtractionGameProps = {
    max: number;
    addition: boolean;
    subtraction: boolean;
    withTenTransition: boolean;
    withTenTransitionEasy: boolean;
}

export const AdditionAndSubstractionIndexParamMax = "max";

export function getRouteToAdditionAndSubtractionIndex(max: number){
    return "/(app)/games/additionAndSubtraction/?"+AdditionAndSubstractionIndexParamMax+"="+max;
}

export default function TabOneScreen() {

    const COLOR_EASY = "#d9ead3";
    const COLOR_MEDIUM = "#fff2cc";
    const COLOR_HARD = "#f4cccc";


    const viewBackgroundColor = useViewBackgroundColor();
    const viewContrastColor = useMyContrastColor(viewBackgroundColor);

    const params = useGlobalSearchParams<{[AdditionAndSubstractionIndexParamMax]: string}>();
    const max = parseInt(params[AdditionAndSubstractionIndexParamMax]) || 20;


    function renderGameType(name: string, gameType: AdditionAndSubtractionGameProps, description: JSX.Element, color: string){
        const colorContrast = useMyContrastColor(color);

        return (
            <MyTouchableOpacity accessibilityLabel={name} style={{borderColor: viewContrastColor, borderWidth: 1, borderRadius: 5, overflow: "hidden"}} onPress={() => {
                router.push(getRouteToAdditionAndSubtractionWithInput(gameType));
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
                </View>
                {description}
            </MyTouchableOpacity>
        );
    }

    const amountColumns = max+"" === ""+20 ? 2 : 3;

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
        if(max+"" === ""+20){
            output.push(renderGameType("Addition (+)", {
                max: 20,
                addition: true,
                subtraction: false,
                withTenTransition: false,
                withTenTransitionEasy: false
            }, renderStars(1, "einfach"), COLOR_EASY))
            output.push(renderGameType("Addition (+)", {
                max: 20,
                addition: true,
                subtraction: false,
                withTenTransition: true,
                withTenTransitionEasy: false
            }, renderStars(2, "schwer"), COLOR_HARD))
            output.push(renderGameType("Subtraktion (–)", {
                max: 20,
                addition: false,
                subtraction: true,
                withTenTransition: false,
                withTenTransitionEasy: false
            }, renderStars(1, "einfach"), COLOR_EASY))
            output.push(renderGameType("Subtraktion (–)", {
                max: 20,
                addition: false,
                subtraction: true,
                withTenTransition: true,
                withTenTransitionEasy: false
            }, renderStars(2, "schwer"), COLOR_HARD))
            output.push(renderGameType("Mix (+,–)", {
                max: 20,
                addition: true,
                subtraction: true,
                withTenTransition: false,
                withTenTransitionEasy: false
            }, renderStars(1, "einfach"), COLOR_EASY))
            output.push(renderGameType("Mix (+,–)", {
                max: 20,
                addition: true,
                subtraction: true,
                withTenTransition: true,
                withTenTransitionEasy: false
            }, renderStars(2, "schwer"), COLOR_HARD))
        } else {
            output.push(renderGameType("Addition (+)", {
                max: 100,
                addition: true,
                subtraction: false,
                withTenTransition: false,
                withTenTransitionEasy: false
            }, renderStars(1, "einfach"), COLOR_EASY))
            output.push(renderGameType("Addition (+)", {
                max: 100,
                addition: true,
                subtraction: false,
                withTenTransition: true,
                withTenTransitionEasy: true
            }, renderStars(2, "mittel"), COLOR_MEDIUM))
            output.push(renderGameType("Addition (+)", {
                max: 100,
                addition: true,
                subtraction: false,
                withTenTransition: true,
                withTenTransitionEasy: false
            }, renderStars(3, "schwer"), COLOR_HARD))
            output.push(renderGameType("Subtraktion (–)", {
                max: 100,
                addition: false,
                subtraction: true,
                withTenTransition: false,
                withTenTransitionEasy: false
            }, renderStars(1, "einfach"), COLOR_EASY))
            output.push(renderGameType("Subtraktion (–)", {
                max: 100,
                addition: false,
                subtraction: true,
                withTenTransition: true,
                withTenTransitionEasy: true
            }, renderStars(2, "mittel"), COLOR_MEDIUM))
            output.push(renderGameType("Subtraktion (–)", {
                max: 100,
                addition: false,
                subtraction: true,
                withTenTransition: true,
                withTenTransitionEasy: false
            }, renderStars(3, "schwer"), COLOR_HARD))
            output.push(renderGameType("Mix (+,–)", {
                max: 100,
                addition: true,
                subtraction: true,
                withTenTransition: false,
                withTenTransitionEasy: false
            }, renderStars(1, "einfach"), COLOR_EASY))
            output.push(renderGameType("Mix (+,–)", {
                max: 100,
                addition: true,
                subtraction: true,
                withTenTransition: true,
                withTenTransitionEasy: true
            }, renderStars(2, "mittel"), COLOR_MEDIUM))
            output.push(renderGameType("Mix (+,–)", {
                max: 100,
                addition: true,
                subtraction: true,
                withTenTransition: true,
                withTenTransitionEasy: false
            }, renderStars(3, "schwer"), COLOR_HARD))
        }
        return output;
    }

  return (
    <View style={{width: "100%", height: "100%"}}>
        <MyScrollView>
            <View style={{width: "100%", alignItems: "center"}}><Heading>{"Wähle dein Spiel"}</Heading></View>
            <View style={{width: "100%", alignItems: "center"}}><Heading>{"Rechnen bis "+max}</Heading></View>
            <GridList paddingVertical={20} paddingHorizontal={20} amountColumns={amountColumns}>
                {renderTasks()}
            </GridList>
        </MyScrollView>
    </View>
  );
}
