import {MyCardWithText, MyCardWithTextProps} from '@/components/card/MyCardWithText';
import {Rectangle} from '@/components/shapes/Rectangle';
import React, {ReactNode} from 'react';
import {MyTouchableOpacity} from "@/components/buttons/MyTouchableOpacity";
import {MyAccessibilityRoles} from "@/helper/accessibility/MyAccessibilityRoles";
import {Image} from "expo-image";


export type MyCardWithImageProps = {
	accessibilityLabel: string,
	borderColor?: string,
	onPress?: () => void,
	image_url?: string | undefined | null,
	imageHeight?: number,
	bottomRightComponent?: ReactNode,
	topRightComponent?: ReactNode,
	bottomLeftComponent?: ReactNode,
	topLeftComponent?: ReactNode,
	innerPadding?: number,
} & MyCardWithTextProps

// define the button component
export const MyCardWithImage = ({heading, accessibilityLabel, onPress, image_url, imageHeight, ...props}: MyCardWithImageProps) => {

	const imageContent = image_url ? (
		<Image source={{uri: image_url}} style={{width: '100%', height: imageHeight}} />
	) : null

	const topContent = (
		<Rectangle>
			<MyTouchableOpacity style={{width: '100%', height: "100%"}} accessibilityRole={MyAccessibilityRoles.ImageButton} accessibilityLabel={accessibilityLabel} onPress={onPress} >
				{imageContent}
			</MyTouchableOpacity>
		</Rectangle>
	)

	return (
		<MyCardWithText topComponent={topContent} heading={heading} {...props} />
	)
}