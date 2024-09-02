import {useSyncState} from "@/helper/syncState/SyncState";
import {DimensionType} from "@/types/DimensionType";
import {NonPersistentStore} from "@/helper/syncState/NonPersistentStore";
import {useIconWithInPixel} from "@/components/shapes/Rectangle";
import {Icon, Text, View} from "@/components/Themed";
import {IconNames} from "@/constants/IconNames";
import React from "react";

export default function RootTextAndIconDimensions() {
    const [textDimensions, setTextDimensions] = useSyncState<DimensionType, DimensionType>(NonPersistentStore.textDimensions);
    const [iconDimensions, setIconDimensions] = useSyncState<DimensionType, DimensionType>(NonPersistentStore.iconDimensions);
    const imageWidth = useIconWithInPixel(1);

    return (
        <View
            pointerEvents="none" // Do not block touch events
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
//				width: 0, // has to be outcommented to get the width on iOS
//				height: 0, // has to be outcommented to get the height on iOS
                // hide the view
                opacity: 0,
            }}
            accessible={false} accessibilityElementsHidden={true}
        >
            <View style={{
                backgroundColor: "red",
                flexDirection: "row"
            }}>
                <Text onLayout={(event) => {
                    const {width, height} = event.nativeEvent.layout;
                    setTextDimensions((currentDimensions) => {
                        return {
                            width: width,
                            height: height
                        }
                    })
                }}>{"M"}</Text>
            </View>
            <Text>{textDimensions?.width?.toString()}</Text>
            <View style={{
                backgroundColor: "blue",
                width: textDimensions?.width,
                height: 10,
            }}/>
            <View style={{
                backgroundColor: "red",
                flexDirection: "row"
            }}>
                <Icon name={IconNames.star_active_icon} onLayout={(event) => {
                    const {width, height} = event.nativeEvent.layout;
                    setIconDimensions((currentDimensions) => {
                        console.log("SetIconDimensions: " + width);
                        return {
                            width: width,
                            height: height
                        }
                    })
                }}/>
            </View>
            <Text>{iconDimensions?.width?.toString()}</Text>
            <Text>{imageWidth}</Text>
            <View style={{
                backgroundColor: "blue",
                width: iconDimensions?.width,
                height: 10,
            }}/>
        </View>
    )
}