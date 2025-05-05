import React from "react";
import {Heading, Icon, View} from "@/components/Themed";

export const GameTypeCardStars = ({numberStars, description}: {numberStars: number, description: string}) => {
    let stars = [];
    for(let i = 0; i < numberStars; i++){
        stars.push(<Icon name="star" color="#FFD700" />);
    }

    return (
        <View style={{alignItems: "center", justifyContent: "center"}}>
            <Heading style={{
                textAlign: "center"
            }}>{description}</Heading>
            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                {stars}
            </View>
        </View>
    );
}
