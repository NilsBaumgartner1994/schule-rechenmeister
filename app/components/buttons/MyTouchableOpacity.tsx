import React from 'react';
import {
	AccessibilityRole,
	AccessibilityState, DimensionValue,
	GestureResponderEvent, Pressable,
	ViewProps
} from 'react-native';
import { View} from '@/components/Themed';

import {Tooltip, TooltipContent, TooltipText} from '@gluestack-ui/themed';
import {useIsDebug} from '@/states/Debug';
import {PressableStateCallbackType} from 'react-native/Libraries/Components/Pressable/Pressable';
import {MyAccessibilityRoles} from '@/helper/accessibility/MyAccessibilityRoles';


// MyTouchableOpacityProps extends TouchableOpacityProps with
// - accessibilityLabel: required
// - accessibilityRole: default 'button'
export type MyTouchableOpacityProps = {
    disabled?: boolean,
    accessibilityLabel: string,
    tooltip?: string,
    accessibilityRole?: AccessibilityRole,
    accessibilityHint?: string,
    accessibilityState?: AccessibilityState,
    onPress?: () => void | ((event: GestureResponderEvent) => void)
	onLongPress?: () => void | ((event: GestureResponderEvent) => void)
    style?: ViewProps['style']
    styled?: ViewProps['style']
    children?: React.ReactNode
}

export const MyTouchableOpacity = ({disabled, accessibilityRole, accessibilityLabel, onLongPress, onPress, style, children ,...props}: MyTouchableOpacityProps) => {
	const isDebug = useIsDebug();

	let mergedStyle: ViewProps['style'] = {
	};
	if (isDebug) {
		function getDebugMargin(value: DimensionValue | undefined) {
			const valueAsNumber = value as number;
			if (valueAsNumber) {
				return valueAsNumber-1;
			} else {
				return -1;
			}
		}

		// @ts-ignore
		mergedStyle = {...mergedStyle,
			borderWidth: 1,
			borderColor: 'red',
			// let the borderWidth not affect the size of the element by subtracting 1 from the margin
			margin: getDebugMargin(mergedStyle?.margin),
			marginRight: getDebugMargin(mergedStyle.marginRight),
			marginLeft: getDebugMargin(mergedStyle.marginLeft),
			marginTop: getDebugMargin(mergedStyle.marginTop),
			marginBottom: getDebugMargin(mergedStyle.marginBottom),
			marginVertical: getDebugMargin(mergedStyle.marginVertical),
			marginHorizontal: getDebugMargin(mergedStyle.marginHorizontal),
		};
	}

	if (Array.isArray(style)) {
		for (const singleStyle of style) {
			// @ts-ignore
			mergedStyle = {...mergedStyle, ...singleStyle};
		}
	} else {
		// @ts-ignore
		mergedStyle = {...mergedStyle, ...style};
	}

	if (disabled) {
		// @ts-ignore
		mergedStyle = {...mergedStyle,
			cursor: 'not-allowed',
		};
	}

	function getStyle(state: PressableStateCallbackType) {
		// @ts-ignore
		const copy = {...mergedStyle}

		const pressed = state.pressed
		copy.opacity = pressed ? 0.5 : copy?.opacity
		return copy;
	}

	if (!onPress) {
		return (
			<View accessibilityState={props?.accessibilityState} accessibilityHint={props?.accessibilityHint} accessibilityLabel={accessibilityLabel} style={mergedStyle}>
				{children}
			</View>
		)
	}

	const tooltip = props?.tooltip || accessibilityLabel;

	return (
		<Tooltip
			placement="top"
			trigger={(triggerProps) => {
				return (
					<Pressable {...triggerProps} onPress={onPress} accessibilityState={props?.accessibilityState} accessibilityHint={props?.accessibilityHint} accessibilityRole={accessibilityRole ?? MyAccessibilityRoles.Button} accessibilityLabel={accessibilityLabel} style={getStyle} disabled={disabled}  {...props}>
						{children}
					</Pressable>
				)
			}}
		>
			<TooltipContent>
				<TooltipText>{tooltip}</TooltipText>
			</TooltipContent>
		</Tooltip>
	)
}
