import React, {FunctionComponent} from "react";
import {Player, useCurrentPlayers} from "@/states/SynchedProfile";
import {Heading, TextInput, View, Text, TEXT_SIZE_4_EXTRA_LARGE, useViewBackgroundColor} from "@/components/Themed";
import {TouchableOpacity} from "react-native";
import {MyButton} from "@/components/buttons/MyButton";
import {GridList} from "@/components/GridList";
import {useProjectColor} from "@/states/ProjectInfo";
import {BUTTON_DEFAULT_BorderRadius, BUTTON_DEFAULT_Padding} from "@/components/buttons/MyButtonCustom";
import {useMyContrastColor} from "@/helper/color/MyContrastColor";

export type SelectAmountPlayersScreenProps = {
    continue: () => void;
    abort: () => void;
}

export const SelectAmountPlayersScreen: FunctionComponent<SelectAmountPlayersScreenProps> = (props) => {

    const maxPlayers = 4;
    const projectColor = useProjectColor()
    const projectColorContrast = useMyContrastColor(projectColor);

    const viewBackgroundColor = useViewBackgroundColor()
    const viewContrastColor = useMyContrastColor(viewBackgroundColor);

    const refs = {};

    const [currentPlayer, setCurrentPlayer, setNextCurrentPlayer, players, setPlayers] = useCurrentPlayers();

    const amountPlayers = Object.keys(players).length;
    const noPlayersCreated = amountPlayers === 0;

    function renderEditPlayer(playerKey: string){
        const player = players[playerKey];
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
                                value={player?.name}
                                key={viewContrastColor}
                                style={{width: "100%", height: "100%", color: viewContrastColor}} placeholder={"Name"} onChangeText={(newName) => {
                                    player.name = newName;
                                    setPlayers({...players});
                            }} />
                        </View>
                        <MyButton useOnlyNecessarySpace={true} accessibilityLabel={"Spieler entfernen"} onPress={() => {
                            // Remove player
                            delete players[playerKey];
                            let newPlayers = {...players};
                            setPlayers(newPlayers);
                        }} icon={"trash-can"} />
                    </View>
                </View>
            </View>
        )
    }

    function renderEditPlayers(){
        if(!noPlayersCreated){
            let output = [];
            for(let playerKey in players){
                output.push(renderEditPlayer(playerKey));
            }
            return output;
        }
        return null;
    }

    function renderContinue(){
        if(amountPlayers > 0){
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
                        <MyButton textSize={TEXT_SIZE_4_EXTRA_LARGE} onPress={() => {
                            props.continue();
                        }} text={"Weiter"} />
                    </View>
                )
        }
    }

    function renderSelectAmountPlayers(){
        if(noPlayersCreated){
            let output = [];
            for(let i = 1; i <= maxPlayers; i++){
                output.push(<MyButton onPress={() => {
                        let newPlayers: Record<string, Player>
                            = {}
                        for(let j = 1; j <= i; j++){
                            let id = j;
                            let newPlayer = {
                                id: id,
                                name: "Spieler "+id,
                                score: 0,
                            }
                            newPlayers[j] = newPlayer;
                        }
                        console.log(newPlayers);
                        setPlayers(newPlayers);
                    }} text={i+" Spieler"} />
                );
            }
            return output;
        }
        return null;
    }

    let content = noPlayersCreated ? renderSelectAmountPlayers() : renderEditPlayers();

    let defaultBreakpoints = {
        base: 1,
        sm: 2,
        md: 2,
        lg: 2,
        xl: 2,
    }

    const title = noPlayersCreated ? "Spieler" : "Name";

  return (
    <View style={{width: "100%", height: "100%", padding: "20px"}}>

        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
            <View style={{width: "100%", alignItems: "center"}}><Heading>{title}</Heading></View>
            <GridList amountColumns={2} paddingHorizontal={20}>
                {content}
            </GridList>
            <View style={{height: 20}} />
            <MyButton accessibilityLabel={"Weiteren Spieler hinzufügen"} onPress={() => {
                let highestId = 0;
                let playerKeys = Object.keys(players);
                for(let key of playerKeys){
                    let keyNumber = parseInt(key);
                    if(keyNumber > highestId){
                        highestId = keyNumber;
                    }
                }
                let nextPlayerId = highestId + 1;
                let newPlayers = {...players};
                newPlayers[nextPlayerId] = {
                    id: nextPlayerId,
                    name: "",
                    score: 0,
                }
                setPlayers(newPlayers);
            }} textSize={TEXT_SIZE_4_EXTRA_LARGE} text={"Spieler hinzufügen"} />
            <View style={{height: 20}} />
            {renderContinue()}
        </View>
    </View>
  );
}
