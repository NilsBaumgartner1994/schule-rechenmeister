import { useTextContrastColor, useViewBackgroundColor} from '@/components/Themed';
import React from 'react';
import {useLighterOrDarkerColorForSelection, useMyContrastColor} from '@/helper/color/MyContrastColor';
import {useProjectColor} from '@/states/ProjectInfo';
import {MyButtonCustom} from '@/components/buttons/MyButtonCustom';
import {MyAccessibilityRoles} from '@/helper/accessibility/MyAccessibilityRoles';

export type MyNewButtonProps = {
    isActive?: boolean,
    onPress?: () => Promise<void> | void,
    openHrefInNewTab?: boolean,
    href?: string,
    accessibilityLabel: string,
    accessibilityRole?: MyAccessibilityRoles,
    text?: string,
	textSize?: string,
	renderedText?: any,
    leftIcon?: string,
    leftIconActive?: string,
    rightIcon?: string,
    rightIconActive?: string,
	iconSize?: number,
    useOnlyNecessarySpace?: boolean,
    disabled?: boolean,
    leftIconColoredBox?: boolean,
    tooltip?: string,
    useTransparentBorderColor?: boolean,
    backgroundColor?: string,
    borderRadius?: number,
    borderLeftRadius?: number,
    borderRightRadius?: number,
    borderTopRadius?: number,
    borderBottomRadius?: number,
    icon?: string | null,
	customIcon?: any
    centerItems?: boolean
}
export const MyButton = (props: MyNewButtonProps) => {
	const viewBackgroundColor = useViewBackgroundColor()
	const textColor = useTextContrastColor()
	const projectColor = useProjectColor()

	// When active
	const activeBackgroundColor = props?.backgroundColor || projectColor
	const activeTextColor = useMyContrastColor(activeBackgroundColor)

	// When active and hovered
	const activeHoveredBackgroundColor = useLighterOrDarkerColorForSelection(activeBackgroundColor)
	const activeHoveredTextColor = useMyContrastColor(activeHoveredBackgroundColor)

	// When not active and not hovered
	const inactiveBackgroundColor = viewBackgroundColor || 'transparent'
	const inactiveTextColor = textColor

	// When not active and hovered
	const inactiveHoveredBackgroundColor = useLighterOrDarkerColorForSelection(inactiveBackgroundColor)
	const inactiveHoveredTextColor = useMyContrastColor(inactiveHoveredBackgroundColor)

	let activeBorderColor = activeBackgroundColor
	let inactiveBorderColor = activeBackgroundColor

	if (props?.useTransparentBorderColor) {
		activeBorderColor = 'transparent'
		inactiveBorderColor = 'transparent'
	}

	return (
		<MyButtonCustom {...props}
			activeBorderColor={activeBorderColor}
			inactiveBorderColor={inactiveBorderColor}
			activeBackgroundColor={activeBackgroundColor}
			activeTextColor={activeTextColor}
			activeHoveredBackgroundColor={activeHoveredBackgroundColor}
			activeHoveredTextColor={activeHoveredTextColor}
			inactiveBackgroundColor={inactiveBackgroundColor}
			inactiveTextColor={inactiveTextColor}
			inactiveHoveredBackgroundColor={inactiveHoveredBackgroundColor}
			inactiveHoveredTextColor={inactiveHoveredTextColor}
		/>
	)
}