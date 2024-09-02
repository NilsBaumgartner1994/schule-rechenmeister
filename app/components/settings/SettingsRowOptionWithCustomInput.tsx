import React, {FunctionComponent} from 'react';
import {useModalGlobalContext} from "@/components/rootLayout/RootThemeProvider";
import {MyModalActionSheetItem} from "@/components/modal/MyModalActionSheet";
import {SettingsRow, SettingsRowProps} from "@/components/settings/SettingsRow";
import {SettingsRowTextEdit} from "@/components/settings/SettingsRowTextEdit";
import {IconNames} from "@/constants/IconNames";

export interface SettingsRowOptionWithCustomInputProps {
	items: MyModalActionSheetItem[];
	onCustomInputSave: (value: string | undefined | null) => void;
	currentValue: string | null | undefined;
	title: string;
}
export const useShowOptionSelectionWithCustomInputModal = (props: SettingsRowOptionWithCustomInputProps) => {
	const translation_title = props.title;
	const [modalConfig, setModalConfig] = useModalGlobalContext();

	const items = props.items;
	const itemCustomInput: MyModalActionSheetItem = {
		key: "customInput",
		label: "Custom Input",
		accessibilityLabel: "Custom Input",
		renderAsItem: (key: string, hide: () => void) => {
			return <SettingsRowTextEdit onSave={(value: string | undefined | null) => {
				hide();
				props.onCustomInputSave(value);
			}}
			labelLeft={"Custom"} accessibilityLabel={"Custom"} labelRight={props.currentValue} {...props} />
		}
	}

	//check if custom input is already in the list
	let customInputAlreadyInList = false;
	for(let i = 0; i < items.length; i++){
		if(items[i].key === itemCustomInput.key){
			customInputAlreadyInList = true;
			break;
		}
	}
	if(!customInputAlreadyInList){
		items.push(itemCustomInput);
	}

	function onPress() {
		setModalConfig({
			title: translation_title,
			accessibilityLabel: translation_title,
			label: translation_title,
			key: 'canteenSelect',
			items: items,
		})
	}

	return onPress
}

interface AppState {
	options: SettingsRowOptionWithCustomInputProps
}
export const SettingsRowOptionWithCustomInput: FunctionComponent<AppState & SettingsRowProps> = ({options,...props}) => {
	const onPress = useShowOptionSelectionWithCustomInputModal(options);

	return (
		<>
			<SettingsRow {...props} rightIcon={IconNames.edit_icon} onPress={onPress} />
		</>

	)
}
