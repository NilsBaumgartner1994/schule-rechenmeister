import React, {useEffect, useState} from "react";
import {Heading, TEXT_SIZE_4_EXTRA_LARGE, View} from "@/components/Themed";
import {MyScrollView} from "@/components/scrollview/MyScrollView";
import {router} from "expo-router";
import {GridList} from "@/components/GridList";
import {GameMode, useGameMode} from "@/states/SynchedGameMode";
import {MyButton} from "@/components/buttons/MyButton";
import {useIsLargeDevice} from "@/helper/device/DeviceHelper";
import {navigateToSelectAmountPlayers} from "@/app/(app)/gamemode/selectPlayers";
import {nacigateToGames} from "@/app/(app)/games";

export function navigateToGameModeSelection(){
    router.push("/(app)/gamemode");
}

const GAME_MODE_NAME_FLASHCARDS = "Karten";
const GAME_MODE_NAME_MULTIPLAYER = "Spiel";

export default function TabOneScreen() {

    const isLargeDevice = useIsLargeDevice();
    const amountColumns = isLargeDevice ? 2: 1;

    const [gameMode, setGameMode] = useGameMode()
    const [configurePlayers, setConfigurePlayers] = useState(false);


    useEffect(() => {
        setConfigurePlayers(false)
    }, [])

    function renderSelectGameMode(){
        return(
            <GridList paddingVertical={20} paddingHorizontal={20} amountColumns={amountColumns}>
                <MyButton textSize={TEXT_SIZE_4_EXTRA_LARGE} isActive={true} accessibilityLabel={GAME_MODE_NAME_FLASHCARDS} onPress={() => {
                    setGameMode(GameMode.FLASHCARDS);
                    nacigateToGames();
                } } text={GAME_MODE_NAME_FLASHCARDS}  />
                <MyButton textSize={TEXT_SIZE_4_EXTRA_LARGE} isActive={true} accessibilityLabel={GAME_MODE_NAME_MULTIPLAYER} onPress={() => {
                    navigateToSelectAmountPlayers();
                } } text={GAME_MODE_NAME_MULTIPLAYER}  />
            </GridList>
        )
    }

  return (
    <View style={{width: "100%", height: "100%"}}>
        <MyScrollView>
            <View style={{
                padding: 20,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                width: "100%",
            }}>
                <Heading>{"Wähle den Spielmodus"}</Heading>
            </View>
            {renderSelectGameMode()}
        </MyScrollView>
    </View>
  );
}
