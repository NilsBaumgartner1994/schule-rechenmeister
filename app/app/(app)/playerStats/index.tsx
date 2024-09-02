import {Heading, Text, TEXT_SIZE_4_EXTRA_LARGE, TEXT_SIZE_6_EXTRA_LARGE, View} from '@/components/Themed';
import React from "react";
import {GridList} from "@/components/GridList";
import {Player, useCurrentPlayers} from "@/states/SynchedProfile";
import {AnimationKing} from "@/components/animations/AnimationKing";
import {ScrollView} from "react-native";
import {useProjectColor} from "@/states/ProjectInfo";
import {MyButton} from "@/components/buttons/MyButton";
import {router} from "expo-router";
import {navigateToGameModeSelection} from "@/app/(app)/gamemode";
import {navigateToHome} from "@/app/(app)/home";

export function navigateToPlayerStats(){
    router?.navigate("(app)/playerStats");
}

export default function TabOneScreen() {

    const projectColor = useProjectColor();

    const [currentPlayer, setCurrentPlayer, setNextCurrentPlayer, players, setPlayers] = useCurrentPlayers();

    function renderPlayer(player: Player){
        const score = player?.score || "0";

        return <View style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
            borderRadius: "10px",
            borderWidth: "2px",
            borderColor: projectColor,
        }}>
            <Text size={TEXT_SIZE_4_EXTRA_LARGE}>{player.name}</Text>
            <Text size={TEXT_SIZE_4_EXTRA_LARGE}>{score}</Text>
        </View>
    }

    function getSortedPlayerIds(){
        let playerIds = Object.keys(players);
        playerIds.sort((a, b) => {
            let playerA = players[a];
            let playerB = players[b];
            return playerB.score - playerA.score;
        });
        return playerIds;
    }

    function renderPlayers(){
        let output = [];
        let playerIds = getSortedPlayerIds();
        for(let i = 0; i < playerIds.length; i++){
            let playerId = playerIds[i];
            let player = players[playerId];
            output.push(renderPlayer(player));
            output.push(<View style={{height: "10px"}} />);
        }
        return output;
    }

    return (
        <View style={{width: "100%", height: "100%", padding: 20}}>
            <ScrollView style={{
                width: "100%",
                height: "100%",
            }}>
                <View style={{width: "100%", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                        <AnimationKing />
                </View>
                <View style={{
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                    <View>
                        <MyButton paddingHorizontal={50} isActive={true} accessibilityLabel={"zur Startseite"} useOnlyNecessarySpace={true} text={"zur Startseite"} leftIcon={"home"} onPress={() => {
                            navigateToHome();
                        }} />
                    </View>
                    <View style={{alignItems: "center", justifyContent: "center"}}>
                        <Heading bold={true}>{"Punkte"}</Heading>
                    </View>
                </View>
                <View style={{width: "100%", height: "20px"}} />
                {renderPlayers()}
            </ScrollView>
        </View>
    );
}