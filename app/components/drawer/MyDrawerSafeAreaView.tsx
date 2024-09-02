import React from 'react';
import {View} from '@/components/Themed';
import {useInsets} from '@/helper/device/DeviceHelper';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

type MySafeAreaViewProps = {
    children: React.ReactNode
    style?: StyleProp<ViewStyle>
}
/**
 * Since SafeAreaView is not supported in Drawer correctly on Android, we need to create a custom wrapper to handle the safe area insets.
 * @param props
 * @constructor
 */
export function MyDrawerSafeAreaView(props: MySafeAreaViewProps) {
	const insets = useInsets()

	return (
		<View style={[{width: '100%', flex: 1, height: '100%', paddingTop: insets.top, paddingLeft: insets.left, paddingRight: insets.right, paddingBottom: insets.bottom}, props.style]}>
			{props.children}
		</View>
	)
}