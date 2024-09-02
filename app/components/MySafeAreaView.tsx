import React from 'react';
import {SafeAreaView} from 'react-native';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {SafeAreaViewProps} from 'react-native-safe-area-context';

/**
 * Since SafeAreaView has not set the width and height to 100% by default, we need to set it manually
 * @param style
 * @param props
 * @constructor
 */
export function MySafeAreaView({style, ...props}: SafeAreaViewProps) {
	const mergedStyle: StyleProp<ViewStyle> = [{width: '100%', height: '100%'}, style]

	return (
		<SafeAreaView {...props} style={mergedStyle} />
	)
}