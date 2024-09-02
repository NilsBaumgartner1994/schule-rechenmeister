// @ts-nocheck
import React, {useEffect, useState} from "react";
import {CrossLottie, Layout} from "kitcheningredients";
import {useBreakpointValue, View, Text} from "native-base";
import lottie from "../assets/animation_shark.json";
import Rectangle from "./Rectangle";

export const AnimationShark = ({children,...props}: any) => {

	const noFoundWidths = {
		base: "80%",
	}
	const noFoundWidth = useBreakpointValue(noFoundWidths);

	return (
		<View style={{width: "100%", alignItems: "center"}}>
			<View style={{width: noFoundWidth}}>
				<Rectangle aspectRatio={5/3} percentMoveTop={-50}>
					<CrossLottie source={lottie} flex={1} />
				</Rectangle>
			</View>
		</View>
	)
}
