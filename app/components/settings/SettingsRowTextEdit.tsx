import React, {Dispatch, FunctionComponent, SetStateAction, useEffect, useRef, useState} from 'react';
import {SettingsRowProps} from './SettingsRow';
import {TextInput, View} from '@/components/Themed';
import {SettingsRowActionsheet} from '@/components/settings/SettingsRowActionsheet';
import {MyButton} from '@/components/buttons/MyButton';
import {ReturnKeyType} from '@/helper/input/ReturnKeyType';
import {IconNames} from '@/constants/IconNames';
import {TranslationKeys, useTranslation} from '@/helper/translations/Translation';
import {MyModalActionSheetItem} from "@/components/modal/MyModalActionSheet";

interface MyContentProps {
    initialValue: string | undefined | null,
    setInputValue?: Dispatch<SetStateAction<string | undefined | null>>,
    onSave: (value: string | undefined | null, hide: () => void) => void,
    placeholder?: string,
    hide: () => void,
}
export const MyTextInputModalContent: FunctionComponent<MyContentProps> = (props) => {
	const {setInputValue} = props;
	const [inputValueLocal, setInputValueLocal] = useState(props?.initialValue)

	const translation_cancel = useTranslation(TranslationKeys.cancel)
	const translation_save = useTranslation(TranslationKeys.save)

	const inputRef = useRef<any>(null);

	function handleFocusTextInput() {
		// Workaround for android: https://github.com/facebook/react-native/issues/19366
		if (inputRef.current) {
			inputRef.current.blur();

			setTimeout(() => {
				inputRef.current.focus();
			}, 100);
		}
	}

	// After the component mounts, focus the input
	useEffect(() => {
		handleFocusTextInput();
	}, [inputRef?.current])

	function handleOnSave() {
		props.onSave(inputValueLocal, props.hide);
	}

	const usedValue = inputValueLocal || '';

	return (
		<View style={{
			width: '100%',
			marginTop: 10,
			paddingHorizontal: 10,
		}}
		>
			<View style={{
				width: '100%',
			}}
			>
				<TextInput
					myRef={inputRef}
					value={usedValue}
					onChangeText={(newText: string) => {
						let usedNewText: string | undefined | null = newText;
						console.log('OnChangeText')
						console.log(newText);
						if (usedNewText==='') {
							usedNewText = null;
						}

						if (setInputValue) {
							setInputValue(usedNewText);
						}
						setInputValueLocal(usedNewText);
					}}
					returnKeyType={ReturnKeyType.done}
					onSubmitEditing={handleOnSave}
					placeholder={props?.placeholder}
				/>
			</View>
			<View style={{
				width: '100%', flexDirection: 'row', marginTop: 10, justifyContent: 'flex-end', marginBottom: 10
			}}
			>
				<MyButton useOnlyNecessarySpace={true}
					isActive={false}
					accessibilityLabel={translation_cancel}
					text={translation_cancel}
					onPress={async () => {
						props?.hide()
					}}
					leftIcon={IconNames.cancel_icon}
				/>
				<View style={{
					// small space between the buttons
					width: 10,
				}}
				/>
				<MyButton useOnlyNecessarySpace={true} accessibilityLabel={translation_save} text={translation_save} onPress={handleOnSave} isActive={true} leftIcon={IconNames.save_icon} />
			</View>
		</View>
	)
}

interface SettingsRowTextEditSpeicificProps {
    accessibilityLabel: string,
    placeholder?: string,
    labelLeft: string,
    // onSave is a function that returns a boolean or a promise that resolves to a boolean or void or Dispatch<SetStateAction<string>>
    onSave: (value: string | undefined | null, hide?: () => void) => (boolean | void | Promise<boolean | void>) | Dispatch<SetStateAction<string>>,
	onCancel?: () => void | Promise<void> | void,
    onTrackColor?: string,
    debug?: boolean,
    value?: string,
    disabled?: boolean
    description?: string,
}

export type SettingsRowTextEditProps = SettingsRowProps & SettingsRowTextEditSpeicificProps;

export const SettingsRowTextEdit = ({accessibilityLabel, labelLeft, rightIcon,...props}: SettingsRowTextEditProps) => {
	const title = labelLeft;


	const initialValue = props?.value || props.labelRight
	const placeholder = props.placeholder;
	const [inputValue, setInputValue] = useState(initialValue)
	let labelRight = inputValue
	if (props.labelRight) {
		labelRight = props.labelRight
	}

	async function onSaveChange(finalValue: string | undefined | null, hide: () => void) {
		//console.log("Save Final Value: ", finalValue);
		let result: boolean = true;
		// check if onSave is a function with one or two parameters
		let hasTwoParameters = false;
		if (props.onSave.length===2) {
			hasTwoParameters = true;
		}

		if (props.onSave) {
			//console.log("Has onSave")
			const resultFromOnSave = await props.onSave(finalValue, hide);
			//console.log("Result from onSave: ", resultFromOnSave);
			if (resultFromOnSave===false) {
				result = false;
			}
		}

		setInputValue(initialValue)

		if (!hasTwoParameters && result) {
			hide()
		}
	}

	const config: MyModalActionSheetItem = {
		onCancel: async () => {
			setInputValue(initialValue)
			if(props.onCancel){
				await props.onCancel()
			}
		},
		label: title,
		accessibilityLabel: accessibilityLabel,
		key: title,
		title: title,
		renderAsContentInsteadItems: (key: string, hide: () => void) => {
			// Use the custom context provider to provide the input value and setter
			return (
				<MyTextInputModalContent
					initialValue={initialValue}
					setInputValue={setInputValue}
					onSave={onSaveChange}
					placeholder={placeholder}
					hide={hide}
				/>
			)
		}
	}

	let usedIconRight = rightIcon;
	if (usedIconRight===undefined) {
		usedIconRight = IconNames.edit_icon
	}

	return (
		<SettingsRowActionsheet rightIcon={usedIconRight} labelLeft={labelLeft} labelRight={labelRight} config={config} accessibilityLabel={accessibilityLabel} {...props}  />
	)
}
