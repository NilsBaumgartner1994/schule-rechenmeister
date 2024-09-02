import React, { FunctionComponent } from 'react';
import {DimensionValue, ScrollViewProps} from 'react-native';
import { ShowMoreGradient } from './ShowMoreGradient';
import { ShowMoreGradientPlaceholder } from './ShowMoreGradientPlaceholder';
import { View, Text } from '@/components/Themed';
import { MyScrollView } from '@/components/scrollview/MyScrollView';

interface AppState {
	hideGradient?: boolean;
	gradientBackgroundColor?: string;
	gradientHeight?: number;
}

export const ScrollViewWithGradient: FunctionComponent<AppState & ScrollViewProps> = ({ children, ...props }) => {
	const horizontal: boolean | undefined | null = !!props?.horizontal;

	const noChildren = !children || children === null || (Array.isArray(children) && children.length === 0);
	const hideGradient = props.hideGradient || noChildren;

	const gradientHeight = props.gradientHeight || 15;
	const renderedGradient = hideGradient ? null : (
		<ShowMoreGradient
			amountOfGradientSteps={20}
			gradientHeight={gradientHeight}
			horizontal={horizontal}
			gradientBackgroundColor={props?.gradientBackgroundColor}
		/>
	);
	const renderedPlaceholder = hideGradient ? null : (
		<ShowMoreGradientPlaceholder horizontal={horizontal} gradientHeight={gradientHeight} />
	);

	const flexDirection: 'row' | 'column' | 'row-reverse' | 'column-reverse' | undefined = horizontal ? 'row' : 'column';
	const alignItems: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline' | undefined = horizontal ? 'flex-start' : 'center';
	let height: DimensionValue | undefined = horizontal ? undefined : '100%';
	let width: DimensionValue | undefined = horizontal ? '100%' : undefined;

	return (
		<View style={{ flexShrink: 1, width: width, height: height, flexDirection: flexDirection }} onLayout={props.onLayout}>
			<MyScrollView
				nestedScrollEnabled={true}
				overScrollMode={'always'}
				style={[props.style, { flexShrink: 1 }]}
				horizontal={horizontal}
				contentContainerStyle={{ flexShrink: 1, alignItems: alignItems, flexDirection: flexDirection }}
				showsVerticalScrollIndicator={true}
				showsHorizontalScrollIndicator={true}
				scrollEnabled={true}
				persistentScrollbar={true}
				{...props}
			>
				{children}
				{renderedPlaceholder}
			</MyScrollView>
			{renderedGradient}
		</View>
	);
};