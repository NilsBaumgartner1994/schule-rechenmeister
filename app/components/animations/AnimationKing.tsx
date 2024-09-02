import React from "react";
import {RectangleWithLayoutCharactersWide} from "@/components/shapes/Rectangle";
import {MyProjectColoredLottieAnimation} from "@/components/lottie/MyProjectColoredLottieAnimation";
import {View} from "@/components/Themed";

import animationSource from "@/assets/animations/animation_king.json";

export const AnimationKing = ({children,...props}: any) => {
	const accessibilityLabel = "King animation";

	return (
		<View style={{width: '100%', alignItems: 'center'}}>
			<RectangleWithLayoutCharactersWide amountOfCharactersWide={15}>
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
