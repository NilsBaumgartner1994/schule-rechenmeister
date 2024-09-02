import React from 'react';
import {Text, View} from '@/components/Themed';
import {StringHelper} from '@/helper/string/StringHelper';

export const SettingsRowSpacer = (props) => {
	return (
		<View style={{width: '100%'}}>
			<Text>{StringHelper.EMPTY_SPACE}</Text>
			<Text>{StringHelper.EMPTY_SPACE}</Text>
		</View>
	)
}
