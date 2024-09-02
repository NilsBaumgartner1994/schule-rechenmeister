import React, {useEffect, useState} from "react";
import {Player, useCurrentPlayers} from "@/states/SynchedProfile";
import {
    Heading,
    TEXT_SIZE_4_EXTRA_LARGE,
    TEXT_SIZE_6_EXTRA_LARGE,
    TextInput,
    useViewBackgroundColor,
    View, Text
} from "@/components/Themed";
import {MyButton} from "@/components/buttons/MyButton";
import {GridList} from "@/components/GridList";
import {useProjectColor} from "@/states/ProjectInfo";
import {BUTTON_DEFAULT_BorderRadius, BUTTON_DEFAULT_Padding} from "@/components/buttons/MyButtonCustom";
import {useMyContrastColor} from "@/helper/color/MyContrastColor";
import {router, useGlobalSearchParams} from "expo-router";
import {nacigateToGames} from "@/app/(app)/games";
import {GameMode, useGameMode} from "@/states/SynchedGameMode";
import {useIsLargeDevice} from "@/helper/device/DeviceHelper";
import { ScrollView } from "react-native";

const PARAM_AMOUNT = "amount"

export function navigateToEditPlayers(amount: number){
    router.push("/(app)/gamemode/editPlayers"+"?"+encodeURIComponent(PARAM_AMOUNT)+"="+encodeURIComponent(amount));
}

export default function TabOneScreen() {

    const projectColor = useProjectColor()
    const projectColorContrast = useMyContrastColor(projectColor);

    const viewBackgroundColor = useViewBackgroundColor()
    const viewContrastColor = useMyContrastColor(viewBackgroundColor);

    const params = useGlobalSearchParams<any>();
    const amount = parseInt(params?.amount) || 4;

    const isLargeDevice = useIsLargeDevice();
    const amountColumns = isLargeDevice ? 2: 1;

    const [gameMode, setGameMode] = useGameMode()
    const [currentPlayer, setCurrentPlayer, setNextCurrentPlayer, players, setPlayers] = useCurrentPlayers();

    const initialPlayers: Record<string, Player> = {}
    for(let i=1; i<=amount; i++){
        initialPlayers[i+""] = {
            name: "",
            id: i+"",
            score: 0
        }
    }

    const [tempPlayers, setTempPlayers] = useState<Record<string, Player>>(initialPlayers)

    useEffect(() => {
        setTempPlayers(initialPlayers);
    }, [])

    function renderEditPlayer(playerKey: string){
        const player = tempPlayers[playerKey];
        const id = player.id;

        return (
            <View style={{
                backgroundColor: projectColor,
                borderRadius: BUTTON_DEFAULT_BorderRadius,
                padding: BUTTON_DEFAULT_Padding
            }}>
                <View>
                    <Heading style={{
                        color: projectColorContrast,
                    }}>{"Spieler "+playerKey}</Heading>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                        borderRadius: 10,
                    }}>
                        <View style={{
                            flex: 1,
                            backgroundColor: viewBackgroundColor,
                        }}>
                            <TextInput
                                size={TEXT_SIZE_4_EXTRA_LARGE}
                                value={player?.name}
                                key={viewContrastColor}
                                style={{width: "100%", height: 100, color: viewContrastColor}} placeholder={"Name"} onChangeText={(newName) => {
                                    player.name = newName;
                                    setTempPlayers({...tempPlayers});
                            }} />
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    function renderEditPlayers(){
        let output = [];
        for(let playerKey in tempPlayers){
            output.push(renderEditPlayer(playerKey));
        }
        return output;
    }

    function renderContinue(){
        let allPlayersHaveNames = true;
        let keys = Object.keys(tempPlayers);
        for(let playerKey of keys){
            let player = tempPlayers[playerKey];
            if(player.name===""){
                allPlayersHaveNames = false;
            }
        }

        if(allPlayersHaveNames){
            let allPlayersHaveNames = true;
            for(let playerKey in players){
                let player = players[playerKey];
                if(player.name === ""){
                    allPlayersHaveNames = false;
                    break;
                }
            }

            const continueStyle = allPlayersHaveNames ? {} : {opacity: 0};

                return (
                    <View style={continueStyle}>
                        <MyButton leftIcon={"play"} textSize={TEXT_SIZE_4_EXTRA_LARGE} onPress={() => {
                            setGameMode(GameMode.PLAYERS);
                            setPlayers({...tempPlayers})
                            nacigateToGames();
                        }} text={"Weiter"} />
                    </View>
                )
        }
    }

  return (
      <ScrollView>
          <View style={{width: "100%", height: "100%", padding: "20px"}}>
              <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                  <View style={{
                      padding: 20,
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "row",
                      width: "100%",
                  }}>
                      <Heading>{"Namen"}</Heading>
                  </View>
                  <GridList amountColumns={amountColumns} paddingVertical={20} paddingHorizontal={20}>
                      {renderEditPlayers()}
                  </GridList>
                  {renderContinue()}
              </View>
          </View>
      </ScrollView>
  );
}
