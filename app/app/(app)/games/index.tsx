import {Heading, TEXT_SIZE_4_EXTRA_LARGE, View} from '@/components/Themed';
import React from "react";
import {MyGridFlatList} from "@/components/grid/MyGridFlatList";
import {ListRenderItemInfo} from "react-native";
import {BreakPoint, useBreakPointValue} from "@/helper/device/DeviceHelper";
import {router} from "expo-router";
import {MyButton} from "@/components/buttons/MyButton";
import {getRouteToAdditionAndSubtractionIndex} from "@/app/(app)/games/additionAndSubtraction";
import {getRouteToMultiplicationAndDivisionIndex} from "@/app/(app)/games/little1x1";

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
            title: "Rechnen bis 20",
        route: getRouteToAdditionAndSubtractionIndex(20),
    }})
    data.push({key: "2", data: {
            title: "Rechnen bis 100",
        route: getRouteToAdditionAndSubtractionIndex(100),

    }})
    data.push({key: "3", data: {
            title: "Das kleine 1x1",
        route: getRouteToMultiplicationAndDivisionIndex(),
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
                <Heading>{"Wähle die Kategorie"}</Heading>
            </View>
           <MyGridFlatList data={data} renderItem={renderItem} amountColumns={amountColumns} />
        </View>
    </View>
  );
}