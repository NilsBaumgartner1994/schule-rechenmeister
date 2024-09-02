import React from 'react';
import {ScrollView, ScrollViewProps} from 'react-native';
import {View} from '@/components/Themed';

/**
 * Since ScrollView on android does not work when the content is not wrapped in a flex: 1 View, we need to create a custom wrapper to handle this.
 * @param children
 * @param props
 * @constructor
 */
export const MyScrollView = ({children, contentContainerStyle, ...props}: ScrollViewProps) => {
	return (
		<ScrollView style={{width: '100%', height: '100%'}} {...props}>
			<View style={[{flex: 1, width: '100%'}, contentContainerStyle]}>
				{children}
			</View>
		</ScrollView>
	)
}
