import React, {FunctionComponent, useEffect, useState} from "react";
import {
    getFontSizeInPixelBySize,
    Text, TEXT_SIZE_2_EXTRA_LARGE,
    TEXT_SIZE_4_EXTRA_LARGE,
    TEXT_SIZE_6_EXTRA_LARGE,
    View
} from "@/components/Themed";
import {MyButton} from "@/components/buttons/MyButton";
import {GridList} from "@/components/GridList";
import {useCurrentPlayers} from "@/states/SynchedProfile";
import {AnimationDonkey} from "@/components/animations/AnimationDonkey";
import {AnimationCorrect} from "@/components/animations/AnimationCorrect";
import {AnimationWrong} from "@/components/animations/AnimationWrong";
import {ScrollView} from "react-native";
import {useMyContrastColor} from "@/helper/color/MyContrastColor";
import {useProjectColor} from "@/states/ProjectInfo";

export type TaskWithSolutionType = {
    task: string;
    solution: number;
}

export type TaskTemplateProps = {
    currentTaskWithSolution: TaskWithSolutionType;
    next: () => void;
}

export const TaskTemplatePlayers: FunctionComponent<TaskTemplateProps> = (props) => {


    const COLOR_TASK = useProjectColor()
    const textColor = useMyContrastColor(COLOR_TASK);

    const COLOR_CORRECT = "#75db70";
    const COLOR_CORRECT_CONTRAST = useMyContrastColor(COLOR_CORRECT);
    const COLOR_WRONG = "#db7070";
    const COLOR_WRONG_CONTRAST = useMyContrastColor(COLOR_WRONG);

    const ANIMATION_CORRECT = "correct";
    const ANIMATION_WRONG = "wrong";
    const ANIMATION_DONKEY = "donkey";
    const ANIMATION_DONKEY_INPUT_VALUE = 7353;

    const defaultGenerateTask = () => {
        return {
            task: "5+5",
            solution: 10,
        }
    }

    const currentTaskWithSolution = props?.currentTaskWithSolution

    const [showAnimation, setShowAnimation] = useState("none");

    const [input, setInput] = useState("");

    const [currentPlayer, setCurrentPlayer, setNextCurrentPlayer, players, setPlayers] = useCurrentPlayers();


    if(!currentTaskWithSolution){
        return null;
    }

    const task = currentTaskWithSolution?.task;
    const solution = currentTaskWithSolution?.solution;


    const currentPlayerName = currentPlayer?.name;

    function renderPlayerName(){
        return(
            <View style={{width: "100%", alignItems: "center", justifyContent: "center", paddingBottom: "5px"}}>
                <View style={{borderRadius: "10px", overflow: "hidden"}}>
                    <View>
                        <View style={{paddingHorizontal: 20}}>
                            <Text size={TEXT_SIZE_2_EXTRA_LARGE}>{currentPlayerName+":"}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    function renderTask(){

        return (
            <View style={{width: "100%", flexDirection: "row", alignItems: "center", backgroundColor: COLOR_TASK, paddingHorizontal: "30px", borderRadius: "20px"}}>
                <View style={{width: "100%", alignItems: "center", justifyContent: "center", flexDirection: "row"}}>
                    <Text style={{
                        color: textColor,
                    }} size={TEXT_SIZE_6_EXTRA_LARGE} bold={true}>{task+" = "}</Text>
                    <View style={{paddingLeft: 10, width: "20%", paddingVertical: 10}}>
                        <MyButton textSize={TEXT_SIZE_4_EXTRA_LARGE} text={input || " "} />
                    </View>
                </View>
            </View>
        )
    }

    function renderPlayerStats(){
        let output = [];
        const playerKeyOrder = Object.keys(players);
        const highestScore = playerKeyOrder.map(playerKey => players[playerKey].score).reduce((a, b) => Math.max(a, b), 0);


        for(let i=0; i<playerKeyOrder.length; i++){
            const playerKey = playerKeyOrder[i];
            const player = players[playerKey];
            const name = player.name;
            const score = player.score
            const text = name + ": " + score;
            const isPlayerActive = currentPlayer?.id === player.id;
            const leftIcon = isPlayerActive ? "account-circle" : "account-clock";
            const rightIcon = (highestScore === score && score > 0) ? "crown" : undefined;

            output.push(
                <MyButton leftIcon={leftIcon} rightIcon={rightIcon} isActive={isPlayerActive} accessibilityLabel={text} text={text} />
            )
        }

        return <GridList paddingVertical={5} paddingHorizontal={5} amountColumns={4}>
            {output}
        </GridList>
    }

    function renderAnimationOverlay(animationComponent: any, hideSolution?: boolean){
        let correctSolutionView: any = (
            <View>
                <MyButton textSize={TEXT_SIZE_4_EXTRA_LARGE} text={task+" = "+solution} />
            </View>
        )
        if(hideSolution){
            correctSolutionView = null;
        }

        return (
            <View style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%", alignItems: "center", justifyContent: "center", padding: "20px"}}>
                <View style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "white", opacity: 0.95}}></View>
                {correctSolutionView}
                {animationComponent}
            </View>
        )
    }

    function renderAnimation(){
        if(showAnimation === ANIMATION_DONKEY){
            return (
                renderAnimationOverlay(
                    <AnimationDonkey />, true
                )
            )
        }
        if(showAnimation === ANIMATION_CORRECT){
            return (
                renderAnimationOverlay(
                    <AnimationCorrect />
                )
            )
        } else if(showAnimation === ANIMATION_WRONG){
            return (
                renderAnimationOverlay(
                    <AnimationWrong />
                )
            )
        } else {
            return null;
        }
    }

    function renderInputFields(){
        let inputFields = [];
        for(let i=0; i<=9; i++){
            inputFields.push(
                <MyButton textSize={TEXT_SIZE_6_EXTRA_LARGE} text={i+""} onPress={() => {
                    let nextInput = input + "" + i;
                    let asNumber = parseInt(nextInput);
                    setInput(""+asNumber);
                }} />
            );
        }
        return inputFields;
    }

    function renderUserInputFields(){

        return (
            <View style={{width: "100%"}}>
                <GridList paddingVertical={3} paddingHorizontal={3} amountColumns={5}>
                    {renderInputFields()}
                </GridList>
            </View>
        )
    }

    function handleConfirm(){
        let asNumber = parseInt(input);
        const isCorrect = asNumber === solution;
        if(isCorrect){
            currentPlayer.score = parseInt(currentPlayer.score) + 1;
            players[currentPlayer.id] = currentPlayer;
            setPlayers(players);
        }
        if(!isCorrect){
            if(asNumber === ANIMATION_DONKEY_INPUT_VALUE){
                setShowAnimation(ANIMATION_DONKEY);
                return;
            }
        }

        setShowAnimation(isCorrect ? ANIMATION_CORRECT : ANIMATION_WRONG);
    }

    function renderConfirmAndReset(){
        let defaultBreakpoints = {
            base: 1,
        }

        return(
            <View style={{width: "100%"}}>
                <GridList paddingVertical={10} amountColumns={1}>
                    <MyButton isActive={true} backgroundColor={COLOR_CORRECT} iconSize={getFontSizeInPixelBySize(TEXT_SIZE_4_EXTRA_LARGE)} textSize={TEXT_SIZE_4_EXTRA_LARGE} icon={"check"} style={{borderColor: "green", borderWidth: 3}} onPress={() => {
                        handleConfirm();
                    }} />
                    <MyButton isActive={true} backgroundColor={COLOR_WRONG} iconSize={getFontSizeInPixelBySize(TEXT_SIZE_4_EXTRA_LARGE)} textSize={TEXT_SIZE_4_EXTRA_LARGE} icon={"trash-can"} style={{borderColor: "red", borderWidth: 3}} onPress={() => {
                        setInput("");
                    }} />
                </GridList>
            </View>
        )
    }

    function renderInputRow(){

        return (
            <View style={{width: "100%", flexDirection: "row"}}>
                <View style={{width: "70%"}}>
                    {renderUserInputFields()}
                </View>
                <View style={{width: "10%"}} />
                <View style={{width: "20%"}}>
                    {renderConfirmAndReset()}
                </View>
            </View>
        )
    }

    useEffect(() => {
        // wait 3 seconds then hide animation
        if(showAnimation !== "none"){
            const animationCorrect = showAnimation === ANIMATION_CORRECT;
            const timeForCorrectAnimation = 1800;
            const timeForWrongAnimation = 3000;
            const timeout = animationCorrect ? timeForCorrectAnimation : timeForWrongAnimation;

            setTimeout(() => {
                    setShowAnimation("none");
                    setInput("");
                    setNextCurrentPlayer();
                    props.next();
                }, timeout);
        }
    }, [showAnimation])

  return (
      <View style={{width: "100%", height: "100%"}}>
          <View style={{width: "100%", height: "100%", flexDirection: "column", justifyContent: "space-between"}}>
              <View style={{width: "100%", flex: 1}}>
                  <ScrollView>
                      <View style={{width: "100%", padding: "20px"}}>
                          {renderPlayerName()}
                          {renderTask()}
                          <View style={{height: "10px"}} />
                          {renderInputRow()}

                      </View>
                  </ScrollView>
              </View>
              <View style={{width: "100%"}}>
                    {renderPlayerStats()}
              </View>
          </View>
          {renderAnimation()}
      </View>
  );
}
