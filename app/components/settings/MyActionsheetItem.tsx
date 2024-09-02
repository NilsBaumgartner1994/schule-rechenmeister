import React, {FunctionComponent, useState} from 'react';
import {Icon, Text, View, useTextContrastColor, useViewBackgroundColor} from '@/components/Themed';
import {ActionsheetItem, ActionsheetItemText} from '@gluestack-ui/themed';
import {AccessibilityRole, TouchableOpacity} from 'react-native';
import {useLighterOrDarkerColorForSelection, useMyContrastColor} from '@/helper/color/MyContrastColor';
import {useProjectColor} from '@/states/ProjectInfo';
import {IconNames} from '@/constants/IconNames';

export interface SettingsRowProps {
    key?: any;
    children?: any;
    labelRight?: string | null,
    leftContent?: string | any,
    rightContent?: React.ReactNode,
    disabled?: boolean,
	active?: boolean,
    leftIcon?: any | string,
    rightIcon?: string,
    onPress?: any,
	padding?: number | undefined
    color?: any
    hideLeftContent?: boolean,
    expandable?: boolean,
    expanded?: boolean,
    customDivider?: any,
    accessibilityLabel: string,
    accessibilityRole?: AccessibilityRole | undefined,
    accessibilityState?: any,
    flex?: number,
    shadeLevel?: number
}

const DEFAULT_PADDING = 12;
export const MyActionsheetItem: FunctionComponent<SettingsRowProps> = (props) => {
	const viewBackgroundColor = useViewBackgroundColor()
	const textColor = useTextContrastColor()
	const lighterOrDarkerBackgroundColor = useLighterOrDarkerColorForSelection(viewBackgroundColor)
	const lighterOrDarkerTextColor = useMyContrastColor(lighterOrDarkerBackgroundColor)
	const projectColor = useProjectColor()
	const projectColorContrast = useMyContrastColor(projectColor)

	const [isHovered, setIsHovered] = useState(false);

	const isActive = props.active || false;
	const usedViewBackgroundColor = isActive ? projectColor : viewBackgroundColor;

	// Function to handle mouse enter event
	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	// Function to handle mouse leave event
	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	if(props.onPress){
		return (
			<TouchableOpacity
				disabled={props.disabled}
				style={{
					minHeight: 40,
					width: '100%',
					flexDirection: 'row',
					alignItems: 'center',
					padding: props.padding || DEFAULT_PADDING,
					backgroundColor: isHovered ? lighterOrDarkerBackgroundColor : usedViewBackgroundColor,
				}}
				accessibilityLabel={props.accessibilityLabel}
				onPress={props.onPress}
				activeOpacity={0.6}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			>
				{props.children}
			</TouchableOpacity>
		);
	} else {
		return (
			<View
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				style={{
					minHeight: 40,
					width: '100%',
					flexDirection: 'row',
					alignItems: 'center',
					padding: props.padding || DEFAULT_PADDING,
					backgroundColor: isHovered ? lighterOrDarkerBackgroundColor : usedViewBackgroundColor,
				}}
				accessibilityLabel={props.accessibilityLabel}
			>
				{props.children}
			</View>
		);
	}



}
