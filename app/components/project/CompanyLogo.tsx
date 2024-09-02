import React, {FunctionComponent} from 'react';
import {ViewProps} from 'react-native';
import {View} from '@/components/Themed';
import {Image} from "expo-image";
import {ProjectLogoDefaultHeightAndWidth} from "@/components/project/ProjectLogo";

const companyLogo = require("@/assets/images/company.png");

interface AppState {
	style?: ViewProps['style'],
	useDefaultHeight?: boolean,
}
export const CompanyLogo: FunctionComponent<AppState & ViewProps> = ({style, ...props}) => {
	let defaultHeightAndWidth: string | number = "100%"

	let usedHeight = style?.height || defaultHeightAndWidth
	let usedWidth = style?.width || defaultHeightAndWidth
	if(props.useDefaultHeight){
		usedHeight = ProjectLogoDefaultHeightAndWidth
	}

	return (
		<View key={"companyLogo"} style={{height: usedHeight, width: usedWidth, alignItems: 'center', justifyContent: 'center', overflow: 'hidden'}}>
			<Image contentFit={"contain"} source={companyLogo} style={{
				width: '100%',
				height: '100%'
			}}/>
		</View>
	)
}