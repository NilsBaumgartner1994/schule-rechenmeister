import React, {FunctionComponent, useEffect, useState} from "react";
import {Heading, Icon, TEXT_SIZE_4_EXTRA_LARGE, TEXT_SIZE_6_EXTRA_LARGE, View} from "@/components/Themed";
import {MyScrollView} from "@/components/scrollview/MyScrollView";
import {router, useGlobalSearchParams} from "expo-router";
import {MyTouchableOpacity} from "@/components/buttons/MyTouchableOpacity";
import {GridList} from "@/components/GridList";
import {useMyContrastColor} from "@/helper/color/MyContrastColor";
import {getRouteToAdditionAndSubtractionWithInput} from "@/app/(app)/games/additionAndSubtraction/gameWithInput";
import {GameMode, useGameMode} from "@/states/SynchedGameMode";
import {MyButton} from "@/components/buttons/MyButton";
import {SelectAmountPlayersScreen} from "@/app/(app)/gamemode/SelectAmountPlayersScreen";
import {useCurrentPlayers} from "@/states/SynchedProfile";

export function navigateToGameModeSelection(){
    router.push("/(app)/gamemode");
}

export default function TabOneScreen() {

    function proceed(){
        router.push("/(app)/games");
    }

    const [gameMode, setGameMode] = useGameMode()
    const [configurePlayers, setConfigurePlayers] = useState(false);
    const [currentPlayer, setCurrentPlayer, setNextCurrentPlayer, players, setPlayers] = useCurrentPlayers();

    useEffect(() => {
        setConfigurePlayers(false)
    }, [])

    function renderSelectGameMode(){
        return(
            <GridList paddingVertical={20} paddingHorizontal={20} amountColumns={2}>
                <MyButton textSize={TEXT_SIZE_4_EXTRA_LARGE} isActive={true} accessibilityLabel={"Flashcard"} onPress={() => {
                    setGameMode(GameMode.FLASHCARDS);
                    proceed();
                } } text={"Flashcard"}  />
                <MyButton textSize={TEXT_SIZE_4_EXTRA_LARGE} isActive={true} accessibilityLabel={"Flashcard"} onPress={() => {
                    setConfigurePlayers(true);
                } } text={"Spieler"}  />
            </GridList>
        )
    }

    function renderConfigurePlayers(){
        return <SelectAmountPlayersScreen continue={() => {
            setConfigurePlayers(false);
            setGameMode(GameMode.PLAYERS);
            // set players score to 0
            let playerIds = Object.keys(players);
            let newPlayers = {...players};
            for(let i = 0; i < playerIds.length; i++){
                let playerId = playerIds[i];
                let player = newPlayers[playerId];
                player.score = 0;
            }
            setPlayers(newPlayers);
            proceed();
        }} abort={() => {
            setConfigurePlayers(false);
        }} />
    }

  return (
    <View style={{width: "100%", height: "100%"}}>
        <MyScrollView>
            <Heading>Wähle den Spielmodus</Heading>
            {configurePlayers ? renderConfigurePlayers() : null }
            {configurePlayers ? null : renderSelectGameMode() }
        </MyScrollView>
    </View>
  );
}
