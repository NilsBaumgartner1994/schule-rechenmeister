import React from "react";
import {Heading, useViewBackgroundColor, View} from "@/components/Themed";
import {MyTouchableOpacity} from "@/components/buttons/MyTouchableOpacity";
import {useMyContrastColor} from "@/helper/color/MyContrastColor";

export const GameTypeCard = ({name, description, color, onPress}: {name: string, description: React.ReactElement, color: string, onPress: () => any}) => {
    const colorContrast = useMyContrastColor(color);
    const viewBackgroundColor = useViewBackgroundColor();
    const viewContrastColor = useMyContrastColor(viewBackgroundColor);

    return (
        <MyTouchableOpacity accessibilityLabel={name} style={{borderColor: viewContrastColor, borderWidth: 1, borderRadius: 5, overflow: "hidden"}}
                            onPress={() => {onPress();}}>
            {/* @ts-ignore */}
            <View style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px",
                backgroundColor: color
            }}>
                <Heading style={{
                    color: colorContrast,
                    textAlign: "center",
                }}>{name}</Heading>
            </View>
            {description}
        </MyTouchableOpacity>
    )
}
