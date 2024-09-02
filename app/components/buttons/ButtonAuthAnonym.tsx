import React from 'react';
import {TranslationKeys, useTranslation} from '@/helper/translations/Translation';
import {ButtonAuthProviderCustom} from '@/components/buttons/ButtonAuthProviderCustom';

export type ButtonAuthAnonymProps = {
    onPress: () => void,
}
// The component to handle SSO login links
export const ButtonAuthAnonym = (props: ButtonAuthAnonymProps) => {
	const continueAnonym = useTranslation(TranslationKeys.continue_without_account)

	const onPress = props.onPress

	return (
		<ButtonAuthProviderCustom key={'authAnonym'} accessibilityLabel={continueAnonym} onPress={onPress} icon_name={'incognito'} text={continueAnonym} />
	);
};
