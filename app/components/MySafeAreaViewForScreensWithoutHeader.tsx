import React from 'react';
import {useInsets} from '@/helper/device/DeviceHelper';
import {SafeAreaViewProps} from 'react-native-safe-area-context';
import {useViewBackgroundColor, View} from "@/components/Themed";

/**
 * Since SafeAreaView is not correctly working in screens without a header, we need to set the padding manually
 * @param props
 * @constructor
 */
export function MySafeAreaViewForScreensWithoutHeader({children, ...props}: SafeAreaViewProps) {
	const insets = useInsets()
	const viewBackgroundColor = useViewBackgroundColor()
	const bottomColorPlaceholder = <View style={{backgroundColor: viewBackgroundColor, height: insets.bottom}} />

	return (
		<View {...props} style={{height: "100%", width: "100%", paddingTop: insets.top, paddingLeft: insets.left, paddingRight: insets.right}} >
			{children}
			{bottomColorPlaceholder}
		</View>
	)
}