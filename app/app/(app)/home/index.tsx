import {
    View,
    Text,
    Heading,
    TEXT_SIZE_3_EXTRA_LARGE,
    TEXT_SIZE_6_EXTRA_LARGE,
    TEXT_SIZE_4_EXTRA_LARGE, getFontSizeInPixelBySize
} from '@/components/Themed';
import {AnimationKing} from "@/components/animations/AnimationKing";
import {MyButton} from "@/components/buttons/MyButton";
import React from "react";
import {MyButtonCustomContentPadder} from "@/components/buttons/MyButtonCustom";
import {router} from "expo-router";
import {navigateToGameModeSelection} from "@/app/(app)/gamemode";

export function navigateToHome(){
    router.push("/(app)/home");
}

export default function TabOneScreen() {
  return (
    <View style={{
      width: '100%',
        justifyContent: 'center',
    }}>
        <View style={{width: "100%"}}>
            <View style={{width: "100%", alignItems: "center"}}>
                <Heading>{"Wer wird Kopfrechenmeister?"}</Heading>
            </View>
            <View style={{width: "100%", height: "20px"}} />
            <View style={{width: "100%", alignItems: "center"}}>
                <View style={{width: "25%", alignItems: "center"}}>
                    <AnimationKing />
                </View>
            </View>
            <View style={{width: "100%", height: "20px"}} />
            <View style={{
                width: "100%",
                alignItems: "center",
            }}>
                <View style={{
                    width: "50%",
                    alignItems: "center",
                }}>
                    <MyButton iconSize={getFontSizeInPixelBySize(TEXT_SIZE_4_EXTRA_LARGE)} leftIcon={"play"} useOnlyNecessarySpace={false} textSize={TEXT_SIZE_4_EXTRA_LARGE} text={"START"} onPress={() => {
                        navigateToGameModeSelection();
                    }} />
                </View>
            </View>
        </View>
    </View>
  );
}