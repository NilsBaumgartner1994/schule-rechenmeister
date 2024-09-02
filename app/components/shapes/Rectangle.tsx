import React, {ReactNode} from 'react';
import {DimensionValue, ViewProps} from 'react-native';
import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {View} from '../Themed';
import {useSyncState} from "@/helper/syncState/SyncState";
import {NonPersistentStore} from "@/helper/syncState/NonPersistentStore";

export type AspectRatio = number | [number, number] | { width: number, height: number };

//https://www.npmjs.com/package/react-rectangle/v/1.2.0
export type MyCardForResourcesWithImageProps = {
	children?: React.ReactNode,
	aspectRatio?: AspectRatio,
	style?: StyleProp<ViewProps>
}

const defaultAspectRatio = 1;

export const useCharacterWithInPixel = (amount: number) => {
	const [textDimensions, setTextDimensions] = useSyncState(NonPersistentStore.textDimensions);
	const width = textDimensions?.width || 0;
	const widthByCharacters = amount * width;
	return widthByCharacters;
}

export const useIconWithInPixel = (amount?: number) => {
	const [iconDimensions, setIconDimensions] = useSyncState(NonPersistentStore.iconDimensions);
	console.log("useIconWithInPixel textDimensions: ",iconDimensions);
	const width = iconDimensions?.width || 0;
	if(amount === undefined){
		amount = 1;
	}

	const widthTimesAmount = amount * width;
	return widthTimesAmount;
}

interface RectanglePropsWithCharactersWide {
	amountOfCharactersWide: number;
	children?: ReactNode;
}
export const RectangleWithLayoutCharactersWide: React.FC<RectanglePropsWithCharactersWide> = ({  amountOfCharactersWide, children }) => {
	// Render amountOfCharactersWide characters wide which are invisible and not selectable and not focusable and not readable by screen readers
	const widthByCharacters = useCharacterWithInPixel(amountOfCharactersWide);

	return <View style={{
		width: widthByCharacters,
		height: widthByCharacters,
	}}>
		{children}
	</View>
}

// define the button component
export const Rectangle = ({aspectRatio, children, style, ...props}: MyCardForResourcesWithImageProps) => {
	const usedAspectRatio = aspectRatio || defaultAspectRatio;

	const multiplier = calculateAspectRatio(usedAspectRatio);

	return (
		<View style={[{ position: 'relative', width: "100%"}, style]} {...props}>
			<View style={{ paddingTop: (100 * multiplier + '%') as DimensionValue }} />
			<View style={{ position: 'absolute', bottom: 0, left: 0, top: 0, right: 0 }}>{children}</View>
		</View>
	);
};

const calculateAspectRatio = (aspectRatio: AspectRatio) => {
	// if number return 1 / aspectRatio

	if (typeof aspectRatio === 'number') {
		return 1 / aspectRatio;
	}

	// if array return aspectRatio[1] / aspectRatio[0]

	const isArray = Array.isArray(aspectRatio);
	if (isArray) {
		const firstElement = aspectRatio[0];
		const secondElement = aspectRatio[1];
		if (firstElement !== undefined && secondElement !== undefined) {
			return secondElement / firstElement;
		} else {
			return defaultAspectRatio;
		}
	} else {
		// if object return aspectRatio.height / aspectRatio.width
		if (aspectRatio.width !== undefined && aspectRatio.height !== undefined) {
			return aspectRatio.height / aspectRatio.width;
		} else {
			return defaultAspectRatio;
		}
	}
};

export { calculateAspectRatio };
