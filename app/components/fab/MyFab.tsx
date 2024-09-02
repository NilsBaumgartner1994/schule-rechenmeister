// define button type which has a icon for left and right side with family and name and color
// also allow to set a callback for the button
// also allow the content to be a component

import {MyTouchableOpacity} from '@/components/buttons/MyTouchableOpacity';

export type MyFabProps = {
    onPress?: () => void,
    children?: React.ReactNode,
    style?: any,
    accessibilityLabel: string,
}

// define the button component
export const MyFab = ({onPress, children, accessibilityLabel, style}: MyFabProps) => {
	return (
		<MyTouchableOpacity accessibilityLabel={accessibilityLabel} onPress={onPress} style={{margin: 5, width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', ...style}}>
			{children}
		</MyTouchableOpacity>
	)
}