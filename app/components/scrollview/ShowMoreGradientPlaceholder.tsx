import React, {FunctionComponent} from 'react';
import {View} from '@/components/Themed';

interface AppState {
    gradientHeight: number,
	horizontal?: boolean | undefined | null
}
export const ShowMoreGradientPlaceholder: FunctionComponent<AppState> = (props) => {
	let padding = props.gradientHeight

	return (
		<View style={{opacity: 1}}>
			<View style={{
				width: padding,
				height: padding,
			}} >

			</View>
		</View>
	);
}
