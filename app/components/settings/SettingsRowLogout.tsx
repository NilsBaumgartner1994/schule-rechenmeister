import React from 'react';
import {useIsCurrentUserAnonymous, useLogoutCallback} from '@/states/User';
import {SettingsRow} from '@/components/settings/SettingsRow';
import {TranslationKeys, useTranslation} from '@/helper/translations/Translation';
import {IconNames} from '@/constants/IconNames';


export const SettingsRowLogout = (props: any) => {
	// TODO: Implement logout functionality at ServerAPI
	const logout = useLogoutCallback()

	const isCurrentUserAnonymous = useIsCurrentUserAnonymous();

	const translation_logout = useTranslation(TranslationKeys.logout)
	const translation_sign_in= useTranslation(TranslationKeys.sign_in);

	let translation_title = translation_logout
	if(isCurrentUserAnonymous){
		translation_title = translation_sign_in;
	}



	return (
		<>
			<SettingsRow labelLeft={translation_title} accessibilityLabel={translation_title} onPress={logout} leftIcon={IconNames.logout_icon} leftContent={translation_title} rightIcon={'logout'} >
			</SettingsRow>
		</>
	)
}
