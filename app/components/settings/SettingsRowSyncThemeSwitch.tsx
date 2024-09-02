import React, {FunctionComponent} from 'react';
import { SettingsRowProps} from './SettingsRow';
import {SettingsRowBooleanSwitch} from './SettingsRowBooleanSwitch';
import {SyncStateKeys, useSyncState} from '@/helper/syncState/SyncState';
import {MyColorSchemeKey, useMyColorSchemeKeySavedOption} from "@/states/ColorScheme";
import {TranslationKeys, useTranslation} from "@/helper/translations/Translation";

interface AppState {

}
export const SettingsRowSyncBooleanSwitch: FunctionComponent<AppState> = ({...props}) => {
	const [savedColorSchemeOptionRaw, setColorSchemeOptionRaw] = useMyColorSchemeKeySavedOption()

	const translation_light = useTranslation(TranslationKeys.color_scheme_light)
	const translation_dark = useTranslation(TranslationKeys.color_scheme_dark)
	const translation_color_scheme = useTranslation(TranslationKeys.color_scheme)

	function onPress() {
		setColorSchemeOptionRaw(
			savedColorSchemeOptionRaw === MyColorSchemeKey.Dark ?
				MyColorSchemeKey.Light : MyColorSchemeKey.Dark
		)
	}

	const isChecked = savedColorSchemeOptionRaw === MyColorSchemeKey.Dark
	const useLeftIcon = isChecked ? "moon-waning-crescent" : "white-balance-sunny"
	const labelLeft = translation_color_scheme
	const labelRight = isChecked ? translation_dark : translation_light

	return (
		<SettingsRowBooleanSwitch leftIcon={useLeftIcon} {...props} labelRight={labelRight} labelLeft={labelLeft} value={isChecked} onPress={onPress} />
	)
}
