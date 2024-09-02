import {MyDrawer, useRenderMyDrawerScreen} from '@/components/drawer/MyDrawer';
import React from 'react';
import {MyDrawerCustomItemProps} from '@/components/drawer/MyDrawerCustomItemCenter';
import {TranslationKeys, useTranslation} from '@/helper/translations/Translation';
import {useLogoutCallback} from '@/states/User';

export const MyDrawerSetup = (props: any) => {
	const translation_logout = useTranslation(TranslationKeys.logout);
	const handleLogout = useLogoutCallback();

	const customDrawerItems: MyDrawerCustomItemProps[] = [
		{
			label: translation_logout,
			onPress: handleLogout,
			onPressInternalRouteTo: undefined,
			onPressExternalRouteTo: undefined,
			icon: 'logout',
			position: 0
		}
	]

	return (
		<MyDrawer
			customDrawerItems={customDrawerItems}
		>
			{useRenderMyDrawerScreen({
				routeName: 'setup/index',
				label: 'Setup',
				title: 'Setup',
				icon: 'home',
				visibleInDrawer: false
			})}
		</MyDrawer>
	)
}