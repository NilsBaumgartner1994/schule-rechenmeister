import {MyButton} from '@/components/buttons/MyButton';
import React from 'react';
import {TranslationKeys, useTranslation} from '@/helper/translations/Translation';
import {IconNames} from '@/constants/IconNames';

export type MyPreviousNextButtonProps = {
    forward: boolean,
    translation: string,
    onPress?: (forward: boolean) => void
    useTransparentBorderColor?: boolean,
}
export const MyPreviousNextButton = (props: MyPreviousNextButtonProps) => {
	const forward = props.forward;
	const iconName = forward ? IconNames.chevron_right_icon : IconNames.chevron_left_icon;
	const translation_next = useTranslation(TranslationKeys.proceed);
	const translation_previous = useTranslation(TranslationKeys.previous);
	const translation = props.translation;

	let usedTranslation = translation;
	if (forward) {
		usedTranslation += ': ' + translation_next;
	} else {
		usedTranslation += ': ' + translation_previous;
	}

	return (
		<MyButton useTransparentBorderColor={props?.useTransparentBorderColor}
			tooltip={usedTranslation}
			useOnlyNecessarySpace={true}
			leftIcon={iconName}
			accessibilityLabel={usedTranslation}
			onPress={() => {
				if (props?.onPress) {
					props?.onPress(forward);
				}
			}}
		/>
	)
}