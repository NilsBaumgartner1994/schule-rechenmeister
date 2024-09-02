import React from "react";
import {NotAllowed} from "@/compositions/animations/NotAllowed";
import {MyButton} from "@/components/buttons/MyButton";
import {TranslationKeys, useTranslation} from "@/helper/translations/Translation";
import {Text, View} from "@/components/Themed";
import {MyTouchableOpacity} from "@/components/buttons/MyTouchableOpacity";
import {useModalGlobalContext} from "@/components/rootLayout/RootThemeProvider";


export type DisabledTouchableOpacityProps = {
	children: React.ReactNode,
	reason: string,
}
export const DisabledTouchableOpacity = ({children, reason}: DisabledTouchableOpacityProps) => {

	const translation_not_usable = useTranslation(TranslationKeys.not_useable);
	const translation_okay = useTranslation(TranslationKeys.okay);
	const [modalConfig, setModalConfig] = useModalGlobalContext();

	const title = translation_not_usable

	const accessiblityLabel = translation_not_usable+". "+reason+"."

	const onPress = () => {
		setModalConfig({
			title: translation_not_usable,
			label: reason,
			accessibilityLabel: accessiblityLabel,
			key: "disabledTouchableOpacity",
			renderAsContentInsteadItems: (key: string, hide: () => void) => {
				return(
					<>
						<NotAllowed />
						<View style={{
							width: "100%",
							paddingHorizontal: 20,
						}}>
							<View style={{
								width: "100%",
								paddingBottom: 20,
							}}>
								<Text>{reason}</Text>
							</View>
							<MyButton useOnlyNecessarySpace={true} accessibilityLabel={translation_okay} tooltip={translation_okay} text={translation_okay} onPress={() => {
								setModalConfig(null);
							}} />
						</View>
					</>
				)
			}
		})
	}

	return <>
		<TouchableOpacityIgnoreChildEvents
			accessibilityLabel={accessiblityLabel}
			tooltip={accessiblityLabel}
			style={{}}
			useDefaultOpacity={true}
			onPress={onPress}>
			{children}
		</TouchableOpacityIgnoreChildEvents>
	</>
}


export type TouchableOpacityIgnoreChildEventsProps = {
	tooltip: string,
	accessibilityLabel: string,
	onPress?: () => void,
	style?: any,
	useDefaultOpacity?: boolean,
	children: React.ReactNode,
}
export const TouchableOpacityIgnoreChildEvents = ({tooltip, accessibilityLabel, onPress, style, useDefaultOpacity,children, ...props}: TouchableOpacityIgnoreChildEventsProps) => {
	const opacity = useDefaultOpacity ? 0.3 : 1;

	let isStyleArray = Array.isArray(style);
	const opacityStyle = {opacity: opacity};
	let mergedStyle = {...opacityStyle, ...style };
	if(isStyleArray){
		mergedStyle = [opacityStyle ,...style];
	}

	return(
		<MyTouchableOpacity accessibilityLabel={accessibilityLabel} tooltip={tooltip} {...props} style={mergedStyle} onPress={() => {
			if(onPress){
				onPress();
			}
		}}>
			<View pointerEvents={"none"}>
				{children}
			</View>
		</MyTouchableOpacity>
	)

}