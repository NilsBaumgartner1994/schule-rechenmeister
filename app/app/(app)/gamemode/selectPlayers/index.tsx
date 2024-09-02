import React from "react";
import {Player, useCurrentPlayers} from "@/states/SynchedProfile";
import {Heading, TEXT_SIZE_4_EXTRA_LARGE, View} from "@/components/Themed";
import {MyButton} from "@/components/buttons/MyButton";
import {GridList} from "@/components/GridList";
import {router} from "expo-router";
import {navigateToEditPlayers} from "../editPlayers";
import {useIsLargeDevice} from "@/helper/device/DeviceHelper";
import {ScrollView} from "react-native";

export function navigateToSelectAmountPlayers(){
    router.push("/(app)/gamemode/selectPlayers");
}

export default function TabOneScreen() {

    const maxPlayers = 4;

    const isLargeDevice = useIsLargeDevice();
    const amountColumns = isLargeDevice ? 2: 1;


    function renderSelectAmountPlayers() {
        let output = [];
        for (let i = 1; i <= maxPlayers; i++) {
            output.push(<MyButton textSize={TEXT_SIZE_4_EXTRA_LARGE} isActive={true} onPress={() => {
                    navigateToEditPlayers(i);
                }} text={i + " Spieler"}/>
            );
        }
        return output;
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
                      <Heading>{"Spieleranzahl wählen"}</Heading>
                  </View>
                  <GridList amountColumns={amountColumns} paddingVertical={20} paddingHorizontal={20}>
                      {renderSelectAmountPlayers()}
                  </GridList>
              </View>
          </View>
      </ScrollView>

  );
}
