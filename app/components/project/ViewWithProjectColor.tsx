import React from 'react';
import {useProjectColor} from '@/states/ProjectInfo';
import {View} from '@/components/Themed';
import {ViewProps} from 'react-native';


export const ViewWithProjectColor = ({style, ...props}: ViewProps) => {
	const projectColor = useProjectColor();
	return <View {...props} style={[style, {backgroundColor: projectColor}]} />
}
