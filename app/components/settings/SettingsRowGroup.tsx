import React, {FunctionComponent} from 'react';
import {SettingsRowSpacer} from '@/components/settings/SettingsRowSpacer';
import {View, Text} from "@/components/Themed";

export interface SettingsRowGroupProps {
    children?: React.ReactNode | React.ReactNode[]
}
export const SettingsRowGroup: FunctionComponent<SettingsRowGroupProps> = ({children, ...props}) => {
	const renderedChildren: React.ReactNode[] = [];

	let usedChildren: React.ReactNode[] = []
	if (!Array.isArray(children)) {
		usedChildren = [children];
	} else {
		usedChildren = children;
	}

	if (usedChildren) {
		for (let i = 0; i < usedChildren.length; i++) {
			if (i > 0) {
				//renderedChildren.push(<Divider key={i} />);
			}
			renderedChildren.push(usedChildren[i]);
		}

		renderedChildren.push(<SettingsRowSpacer />)
	}

	return <View style={
		{
			width: "100%",
			flexDirection: "row",
			flexWrap: "wrap"
		}
	}>
		{renderedChildren}
	</View>
}
