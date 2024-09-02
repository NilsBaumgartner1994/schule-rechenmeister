// define button type which has a icon for left and right side with family and name and color
// also allow to set a callback for the button
// also allow the content to be a component

import {Platform} from 'react-native';
import {MyTouchableOpacity} from '@/components/buttons/MyTouchableOpacity';
import {MyAccessibilityRoles} from '@/helper/accessibility/MyAccessibilityRoles';
import {CommonSystemActionHelper, HrefHelper} from '@/helper/device/CommonSystemActionHelper';
import {PlatformHelper} from "@/helper/PlatformHelper";
import {router} from "expo-router";
import {Text} from "@/components/Themed";
import React from "react";
// access app.json from expo
import appJson from "../../app.json"


export type MyLinkDefaultProps = {
	label: string,
}  & MyLinkCustomProps

export const MyLinkDefault = ({label, ...props}: MyLinkDefaultProps) => {
	return(
		<MyLinkCustom {...props} accessibilityLabel={label}>
			<Text style={{fontSize: 12}} underline={true}>{label}</Text>
		</MyLinkCustom>
	)
}


export type MyLinkCustomProps = {
	hrefExternal?: string | null | undefined,
	routeInternal?: string | null | undefined,
	onPress?: () => void,
	children?: React.ReactNode,
	accessibilityLabel: string
}
// define the button component
export const MyLinkCustom = ({onPress, routeInternal, hrefExternal, accessibilityLabel, children}: MyLinkCustomProps) => {
	let newTab = false
	if(!!hrefExternal){
		newTab = true
		if(hrefExternal.startsWith(HrefHelper.MAILTO)){
			newTab = false
		}
	}


	let onPressForLinks = undefined
	if(PlatformHelper.isSmartPhone()){
		onPressForLinks = () => {
			if(routeInternal){
				router.navigate(routeInternal)
			}
			if(hrefExternal){
				CommonSystemActionHelper.openExternalURL(hrefExternal, newTab)
			}
		}
	}

	let usedHrefForWeb = routeInternal || hrefExternal
	let usedOnPress = onPressForLinks

	if(onPress) {
		usedOnPress = onPress
	}


	const button = (
			<MyTouchableOpacity accessibilityRole={MyAccessibilityRoles.Link} onPress={usedOnPress} accessibilityLabel={accessibilityLabel}>
				{children}
			</MyTouchableOpacity>
	)

	// TODO: Check if expo issue is fixed: https://github.com/expo/expo/issues/26566
	if (Platform.OS === 'web' && !onPress && usedHrefForWeb) {
		if(routeInternal){
			let baseUrl = appJson?.expo?.experiments?.baseUrl
			if(baseUrl){
				usedHrefForWeb = baseUrl + routeInternal
			}
		}

		return (
			<a href={usedHrefForWeb} onClick={(event) => {
				event.preventDefault() // because we want to handle the routing ourselves and not let the browser handle it

				if(routeInternal){
					router.navigate(routeInternal)
				}
				if(hrefExternal){
					CommonSystemActionHelper.openExternalURL(hrefExternal, newTab)
				}
			}} style={{ textDecoration: 'none',
				// mouse cursor
				cursor: 'pointer',
			}}>
				{button}
			</a>
		)
	} else {
		return button
	}
}