import React from "react";
import {Heading, TEXT_SIZE_4_EXTRA_LARGE, View} from "@/components/Themed";
import {router} from "expo-router";
import {BreakPoint, useBreakPointValue} from "@/helper/device/DeviceHelper";
import {ListRenderItemInfo} from "react-native";
import {MyButton} from "@/components/buttons/MyButton";
import {MyGridFlatList} from "@/components/grid/MyGridFlatList";
import {
    getRouteToAdditionAndSubtractionUpTo100WithCarryOver
} from "@/app/(app)/games/additionAndSubtraction/upTo100/withCarryOver";
import {
    getRouteToAdditionAndSubtractionUpTo100WithoutCarryOver
} from "@/app/(app)/games/additionAndSubtraction/upTo100/withoutCarryOver";

export function getRouteToAdditionAndSubtractionUpTo100(){
    return "/(app)/games/additionAndSubtraction/upTo100";
}

export default function TabOneScreen() {

    type DataItem = { key: string; data: {
            title: string,
            route: string,
        } }

    const amountColumns = useBreakPointValue({
        [BreakPoint.sm]: 2,
        [BreakPoint.md]: 3,
    });

    const data: DataItem[] = []

    data.push({key: "1", data: {
            title: "Ohne Zehnerübergang",
            route: getRouteToAdditionAndSubtractionUpTo100WithoutCarryOver(),
        }})
    data.push({key: "2", data: {
            title: "Mit Zehnerübergang",
            route: getRouteToAdditionAndSubtractionUpTo100WithCarryOver(),

        }})

    const renderItem = (info: ListRenderItemInfo<DataItem>) => {
        const {item, index} = info;
        let title: string = item.data?.title || 'No name'

        return (
            <MyButton textSize={TEXT_SIZE_4_EXTRA_LARGE} isActive={true} accessibilityLabel={title} onPress={() => {
                router.push(item.data.route);
            } } text={title}  />
        );
    }

    return (
        <View style={{
            width: '100%',
            justifyContent: 'center',
        }}>
            <View style={{width: "100%"}}>
                <View style={{
                    padding: 20,
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                    width: "100%",
                }}>
                    <Heading>{"Wähle dein Spiel"}</Heading>
                </View>
                <MyGridFlatList data={data} renderItem={renderItem} amountColumns={amountColumns} />
            </View>
        </View>
    );
}