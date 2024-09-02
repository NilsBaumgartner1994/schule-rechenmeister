import React from 'react';
import {MyColorSchemeKey, useIsDarkTheme, useMyColorSchemeKeySavedOption} from '@/states/ColorScheme';
import {Icon, View, Text} from '@/components/Themed';
import {MyFab} from '@/components/fab/MyFab';
import {useIsDeveloperModeActive} from '@/states/Develop';

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from 'expo-router';

export interface RootFabHolderProps {
    children?: React.ReactNode;
}

const DevelopThemeSwitch = () => {
	const [savedColorSchemeOptionRaw, setColorSchemeOptionRaw] = useMyColorSchemeKeySavedOption()

	return (
		<MyFab key={'develop-theme-switch'}
			style={{backgroundColor: 'red'}}
			accessibilityLabel={'themeSwitcher'}
			onPress={() => {
				setColorSchemeOptionRaw(
					savedColorSchemeOptionRaw === MyColorSchemeKey.Dark ?
						MyColorSchemeKey.Light : MyColorSchemeKey.Dark
				)
			}}
		>
			<Icon name={'theme-light-dark'} size={24} />
		</MyFab>
	)
}

export const RootFabHolder = (props: RootFabHolderProps) => {
	const isDevelopMode = useIsDeveloperModeActive();

	return (
		<View style={{position: 'absolute', bottom: 0, right: 0}}>
			{/* Render the children */}
			{props?.children}
			{isDevelopMode ? <DevelopThemeSwitch /> : null}
		</View>
	)
}