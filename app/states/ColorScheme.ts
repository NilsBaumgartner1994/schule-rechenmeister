import {useSyncState} from '@/helper/syncState/SyncState';
import {PersistentStore} from '@/helper/syncState/PersistentStore';
import {DarkTheme, DefaultTheme, Theme} from '@react-navigation/native';
import {useColorScheme as useDefaultColorScheme} from 'react-native';
import {ColorSchemeName as RNColorSchemeName} from 'react-native/Libraries/Utilities/Appearance';

const DarkBlueTheme: Theme = {
	dark: true,
	colors: {
		primary: 'rgb(10, 132, 255)',
		background: '#1C1B22',
		card: '#2B2A33',
		text: 'rgb(229, 229, 231)',
		border: 'rgb(39, 39, 41)',
		notification: 'rgb(255, 69, 58)',
	},
};

/**
 * Enum for raw color scheme names including system setting.
 */
export enum MyColorSchemeKey {
    Light = 'light',
    Dark = 'dark',
    DarkBlueTheme = 'darkBlueTheme',
    System = 'system'
    // TODO: Idea to automatically set the color scheme based on the time of day.
}

/**
 * Retrieves all values from MyColorSchemeKey enum.
 * @returns Array of MyColorSchemeKey values.
 */
export function getMyColorSchemeKeyOptions(): MyColorSchemeKey[] {
	return Object.values(MyColorSchemeKey);
}

/**
 * Custom hook to get and set color scheme raw value.
 * @returns Tuple containing color scheme raw value and setter function.
 */
export function useMyColorSchemeKeySavedOption(): [MyColorSchemeKey | null, (newValue: MyColorSchemeKey) => void] {
	const [colorSchemeRaw, setColorSchemeRaw] = useSyncState<MyColorSchemeKey, MyColorSchemeKey>(PersistentStore.colorSchemeName)
	return [colorSchemeRaw, setColorSchemeRaw]
}

function isColorSchemeKeyValid(colorSchemeKey: string | null): boolean {
	if (!colorSchemeKey) {
		return false;
	}
	return getMyColorSchemeKeyOptions().includes(colorSchemeKey as MyColorSchemeKey);
}

function getBestFittingSystemColorSchemeKey(systemColorScheme: RNColorSchemeName): MyColorSchemeKey {
	if (systemColorScheme) {
		// @ts-ignore Ignore this error since the value of RNColorSchemeName might change in the future.
		if (isColorSchemeKeyValid(systemColorScheme) && systemColorScheme !== MyColorSchemeKey.System) {
			return systemColorScheme as MyColorSchemeKey;
		}
	}
	return MyColorSchemeKey.Light; // Default value
}

export function useColorSchemeKeyToThemeDictionary(): Record<MyColorSchemeKey, Theme> {
	const systemColorScheme: RNColorSchemeName = useDefaultColorScheme(); // light' | 'dark' | null | undefined;

	const defaultMap = {
		[MyColorSchemeKey.System]: DefaultTheme,
		[MyColorSchemeKey.Light]: DefaultTheme,
		[MyColorSchemeKey.DarkBlueTheme]: DarkBlueTheme,
		[MyColorSchemeKey.Dark]: DarkTheme
	}

	const bestFittingSystemColorSchemeKey = getBestFittingSystemColorSchemeKey(systemColorScheme);
	const bestFittingSystemColorSchemeTheme = defaultMap[bestFittingSystemColorSchemeKey];
	defaultMap[MyColorSchemeKey.System] = bestFittingSystemColorSchemeTheme;

	return defaultMap;
}

export function useDislikeColor(): string {
	return "#ff0000";
}

export function useLikeColor(): string {
	return "#00ff00";
}

/**
 * Custom hook to determine the color scheme name based on system setting and saved user preference.
 * It first checks if the user has saved a preference. If not, it checks the system setting.
 * @returns MyColorSchemeKey based on system setting or user preference.
 */
export function useMyColorSchemeKeyDetermined(): MyColorSchemeKey {
	const [colorSchemeRaw, setColorSchemeRaw] = useMyColorSchemeKeySavedOption()
	if (isColorSchemeKeyValid(colorSchemeRaw)) {
		return colorSchemeRaw as MyColorSchemeKey;
	}
	return MyColorSchemeKey.System;
}

/**
 * Custom hook to get the theme based on the current color scheme.
 * @returns Theme object based on the current color scheme.
 */
export function useThemeDetermined(): Theme {
	const colorSchemeKey = useMyColorSchemeKeyDetermined();
	const colorSchemeKeyToThemeDictionary = useColorSchemeKeyToThemeDictionary();
	return colorSchemeKeyToThemeDictionary[colorSchemeKey];
}

/**
 * Custom hook to determine if the current theme is dark.
 * @returns Boolean indicating if the current theme is dark.
 */
export function useIsDarkTheme(): boolean {
	const theme = useThemeDetermined();
	return theme.dark;
}
