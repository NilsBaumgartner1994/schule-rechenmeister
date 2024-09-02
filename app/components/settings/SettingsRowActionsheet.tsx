import React, {FunctionComponent} from 'react';
import {SettingsRow, SettingsRowProps} from './SettingsRow';
import {MyModalActionSheetItem} from "@/components/modal/MyModalActionSheet";
import {useModalGlobalContext} from "@/components/rootLayout/RootThemeProvider";

interface AppState {
    accessibilityLabel: string,
    debug?: boolean,
    disabled?: boolean
    config: MyModalActionSheetItem
}
export const SettingsRowActionsheet: FunctionComponent<AppState & SettingsRowProps> = ({config, accessibilityLabel,...props}) => {
	const [modalConfig, setModalConfig] = useModalGlobalContext();

	const onPress = () => {
		setModalConfig(config);
	}

	return (
		<SettingsRow accessibilityLabel={accessibilityLabel} {...props} onPress={onPress} />
	)
}
