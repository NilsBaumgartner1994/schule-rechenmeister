import React, {FunctionComponent, useEffect} from 'react';
import {ShowMoreGradientPlaceholder} from './ShowMoreGradientPlaceholder';
import {View} from '@/components/Themed';
import {useThemeDetermined} from '@/states/ColorScheme';

interface AppState {
    horizontal?: boolean | undefined | null
    gradientBackgroundColor?: string
    gradientHeight: number
	amountOfGradientSteps?: number
}
export const ShowMoreGradient: FunctionComponent<AppState> = (props) => {
	const horizontal = props?.horizontal;
	const height = horizontal ? '100%' : undefined;
	const width = horizontal ? undefined : '100%';

	const theme = useThemeDetermined()

	const bgColor = props?.gradientBackgroundColor || theme?.colors?.background || '#000000';

	useEffect(() => {
		let isMounted = true;  // mutable flag

		return () => { isMounted = false };  // cleanup toggles value, if unmounted
	}, []);  // adjust dependencies to your needs

	function renderGradient() {
		/**
         * Removed due to cleanUp Bugs in Linear Gradient
         return (
         <LinearGradient
         style={{flex: 4}}
         colors={gradColors}
         pointerEvents={'none'}
         />
         )

         */

		const usedAmountOfGradientSteps = props?.amountOfGradientSteps || 5;
		// Custom LinearGradient
		const steps = new Array(usedAmountOfGradientSteps).fill(0);


		return (
			<>
				{steps.map((_, i) => (
					<View
						pointerEvents={'none' /* pass all press events through */}
						key={i}
						style={{
							flex: 1,
							backgroundColor: bgColor,
							opacity: i / steps.length,  // Increase the opacity for each step
							height: height,
							width: width,
						}}
					/>
				))}
			</>
		)
	}


	const flexDirection = horizontal ? 'row' : 'column';

	return (
		<View pointerEvents="none" style={{position: 'absolute', right: 0, bottom: 0, height: height, width: width }}>
			<ShowMoreGradientPlaceholder gradientHeight={props?.gradientHeight} />
			<View style={{position: 'absolute', flexDirection: flexDirection, height: '100%', width: '100%', bottom: 0, right: 0}}>
				{renderGradient()}
				<View style={{flex: 1, backgroundColor: bgColor}} />
			</View>
		</View>
	);
}
