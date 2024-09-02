import React, {FunctionComponent} from 'react';
import { SettingsRowProps} from './SettingsRow';
import {SettingsRowBooleanSwitch} from './SettingsRowBooleanSwitch';
import {SyncStateKeys, useSyncState} from '@/helper/syncState/SyncState';

interface AppState {
    accessibilityLabel: string,
    labelLeft: string,
    leftIconOn?: string,
    leftIconOff?: string,
    variable: SyncStateKeys,
    onPress?: (nextValue: boolean) => void,
}
export const SettingsRowSyncBooleanSwitch: FunctionComponent<AppState & SettingsRowProps> = ({leftIcon, labelLeft,...props}) => {
	const [isCheckedRaw, setIsChecked] = useSyncState<boolean>(props.variable);
	const isChecked = isCheckedRaw===true

	let useLeftIcon = leftIcon;
	if (isChecked && !!props.leftIconOn) {
		useLeftIcon = props.leftIconOn;
	}
	if (!isChecked && !!props.leftIconOff) {
		useLeftIcon = props.leftIconOff;
	}

	function onPress(nextValue: boolean) {
		setIsChecked((currentValue) => {
			return !currentValue;
		});
		if (props.onPress) {
			props.onPress(nextValue);
		}
	}

	return (
		<SettingsRowBooleanSwitch leftIcon={useLeftIcon} {...props} labelLeft={labelLeft} value={isChecked} onPress={onPress} />
	)
}
