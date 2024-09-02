import {useProfileLanguageCode} from '@/states/SynchedProfile';
import {useSynchedWikisDict} from '@/states/SynchedWikis';
import {MyDrawerCustomItemProps} from '@/components/drawer/MyDrawerCustomItemCenter';
import {getDirectusTranslation, TranslationEntry} from '@/helper/translations/DirectusTranslationUseFunction';
import React from 'react';
import {
	getMyScreenHeaderFunction,
	MyScreenHeader,
	MyScreenHeaderProps,
	MyScreenHeaderPropsRequired
} from '@/components/drawer/MyScreenHeader';
import {Wikis} from '@/helper/database/databaseTypes/types';
import {renderMyDrawerScreen, useDrawerActiveBackgroundColor} from '@/components/drawer/MyDrawer';
import {SEARCH_PARAM_WIKIS_CUSTOM_ID, SEARCH_PARAM_WIKIS_ID, useWikiFromLocalSearchParams} from "@/app/(aux)/wikis/index";

export const getInternalRouteToWiki = (wiki: Wikis) => {
	let custom_id = wiki.custom_id
	let id = wiki.id
	let search_value = custom_id ? custom_id : id
	let screen = "wikis"
	let search_param = custom_id ? SEARCH_PARAM_WIKIS_CUSTOM_ID : SEARCH_PARAM_WIKIS_ID
	// aka wikis/?wikis_id=232j3h434ii2j3
	// or wikis/?wikis_custom_id=about-us
	return `/${screen}?${search_param}=${search_value}`
}

export function useMyDrawerWikiItems() {
	const [languageCode, setLanguageCode] = useProfileLanguageCode();

	const [wikisDict, setWikisDict] = useSynchedWikisDict()

	const customDrawerItems: MyDrawerCustomItemProps[] = [
		/**
         {
         label: "Hallo",
         onPress: undefined,
         onPressInternalRouteTo: undefined,
         onPressExternalRouteTo: undefined,
         icon: "home",
         position: 0
         }
         */
	]

	if (wikisDict) {
		const wikisDictKeys = Object.keys(wikisDict)
		for (let i = 0; i < wikisDictKeys.length; i++) {
			const wikiKey = wikisDictKeys[i]
			const wiki = wikisDict[wikiKey]
			if(!!wiki){
				const visible = wiki.show_in_drawer || wiki.show_in_drawer_as_bottom_item

				if (visible) {
					const icon = wiki.icon || 'home'

					const translations = wiki.translations as TranslationEntry[]
					const fallback_text = wiki.id
					let label = getDirectusTranslation(languageCode, translations, 'title', false, fallback_text)

					customDrawerItems.push({
						label: label,
						onPress: undefined,
						onPressInternalRouteTo: getInternalRouteToWiki(wiki),
						onPressExternalRouteTo: wiki?.url,
						icon: icon,
						position: wiki?.position || undefined,
						visibleInDrawer: wiki.show_in_drawer,
						visibleInBottomDrawer: wiki.show_in_drawer_as_bottom_item
					})
				}
			}
		}
	}

	return customDrawerItems;
}

function MyWikiHeader(props: MyScreenHeaderPropsRequired) {
	const wiki = useWikiFromLocalSearchParams();
	const wikiId = wiki?.id

	return <MyWikiHeaderById id={wikiId} {...props} />
}

type MyWikiHeaderByIdProps = MyScreenHeaderPropsRequired & {
	id: string | undefined
}

const MyWikiHeaderById = ({id, ...props}: MyWikiHeaderByIdProps) => {
	const [wikisDict, setWikisDict] = useSynchedWikisDict()
	const [languageCode, setLanguageCode] = useProfileLanguageCode();
	const wikiId = id as string

	let custom_title = id as string

	if (!!wikisDict && !!wikiId) {
		const wiki = wikisDict[wikiId]
		const translations = wiki.translations as TranslationEntry[]
		const fallback_text = wiki.id
		const label = getDirectusTranslation(languageCode, translations, 'title', false, fallback_text)
		if (label) {
			custom_title = label
		}
	}

	return <MyScreenHeader custom_title={custom_title} {...props} />
}

const getMyScreenHeaderWikis: getMyScreenHeaderFunction = () => {
	return (props: MyScreenHeaderProps) => {
		return <MyWikiHeader {...props} />
	}
}

export function useRenderedMyDrawerWikiScreens() {
	const drawerActiveBackgroundColor = useDrawerActiveBackgroundColor()

	return [
		renderMyDrawerScreen({
				routeName: 'wikis/index',
				label: 'Wikis',
				title: 'Wikis',
				icon: 'home',
				visibleInDrawer: false,
				getHeader: getMyScreenHeaderWikis(),
			},
			drawerActiveBackgroundColor
		)
	];
}