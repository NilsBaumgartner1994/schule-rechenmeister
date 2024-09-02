import React from "react";
import {View} from "react-native";
import {RectangleWithLayoutCharactersWide} from "@/components/shapes/Rectangle";
import {MyProjectColoredLottieAnimation} from "@/components/lottie/MyProjectColoredLottieAnimation";

const animationSource = require('@/assets/animations/cat.json');

export const AnimationCat = ({children,...props}: any) => {

	const accessibilityLabel = "Cat animation";

	return (
		<View style={{width: '100%', alignItems: 'center'}}>
			<RectangleWithLayoutCharactersWide amountOfCharactersWide={20}>
				<MyProjectColoredLottieAnimation style={{
					width: '100%',
					height: '100%'
				}}
												 source={animationSource}
												 accessibilityLabel={accessibilityLabel}
				/>
			</RectangleWithLayoutCharactersWide>
		</View>
	)
}
