import {PersistentStore} from '@/helper/syncState/PersistentStore';
import {Wikis} from '@/helper/database/databaseTypes/types';
import {useSynchedResourcesDictRaw} from '@/states/SynchedResource';
import {useIsDemo} from '@/states/SynchedDemo';
import {CollectionHelper} from '@/helper/database/server/CollectionHelper';
import {MyCacheHelperDeepFields, MyCacheHelperType} from "@/helper/cache/MyCacheHelper";

export enum Custom_Wiki_Ids {
    about_us = 'about-us',
    license = 'license',
    privacy_policy = 'privacy-policy',
    cookieComponentConsent = 'cookieComponentConsent',
    cookieComponentAbout = 'cookieComponentAbout',
    terms_of_service = 'terms-of-service',
    accessibility = 'accessibility',
}

export const TABLE_NAME_WIKIS = 'wikis';
const cacheHelperDeepFields_wikis: MyCacheHelperDeepFields = new MyCacheHelperDeepFields([
	{
		field: '*',
		limit: -1,
		dependency_collections_or_enum: [TABLE_NAME_WIKIS],
	},
	{
		field: 'translations.*',
		limit: -1,
		dependency_collections_or_enum: ["wikis_translations"],
	},
])
async function loadWikisFromServer(): Promise<Wikis[]> {
	const collectionHelper = new CollectionHelper<Wikis>(TABLE_NAME_WIKIS);
	const query = cacheHelperDeepFields_wikis.getQuery()
	return await collectionHelper.readItems(query);
}

export function useSynchedWikisDict(): [ Record<string, Wikis | null | undefined> | null | undefined, ((callback: (currentValue: Record<string, Wikis | null | undefined> | null | undefined) => Record<string, Wikis | null | undefined>, sync_cache_composed_key_local?: string) => void), cacheHelperObj: MyCacheHelperType]
{
	const [resourcesOnly, setResourcesOnly, resourcesRaw, setResourcesRaw] = useSynchedResourcesDictRaw<Wikis>(PersistentStore.wikis);
	const demo = useIsDemo()
	const sync_cache_composed_key_local = resourcesRaw?.sync_cache_composed_key_local;
	let usedResources = resourcesOnly;
	if (demo) {
		usedResources = getDemoWikis()
	}

	async function updateFromServer(sync_cache_composed_key_local?: string) {
		const resourceAsList = await loadWikisFromServer();
		const resourceAsDict = CollectionHelper.convertListToDict(resourceAsList, 'id')
		setResourcesOnly((currentValue) => {
			return resourceAsDict
		}, sync_cache_composed_key_local);
	}

	const cacheHelperObj: MyCacheHelperType = {
		sync_cache_composed_key_local: sync_cache_composed_key_local,
		updateFromServer: updateFromServer,
		dependencies: cacheHelperDeepFields_wikis.getDependencies()
	}

	return [usedResources, setResourcesOnly, cacheHelperObj]
}

export function useSynchedWikisDictByCustomId(): Record<string, Wikis> {
	const [wikis, setWikis, lastUpdate] = useSynchedWikisDict();
	const dictCustomIdToWiki: Record<string, Wikis> = {}
	if (wikis) {
		const wikiKeys = Object.keys(wikis)
		for (let i = 0; i < wikiKeys.length; i++) {
			const wiki = wikis[wikiKeys[i]]
			if (wiki.custom_id) {
				dictCustomIdToWiki[wiki.custom_id] = wiki
			}
		}
	}
	return dictCustomIdToWiki;
}

export function useSynchedWikiByCustomId(customId: string): Wikis | undefined {
	const dictCustomIdToWiki = useSynchedWikisDictByCustomId()
	return dictCustomIdToWiki[customId]
}

export function useSynchedWikiById(id: string): Wikis | undefined {
	const [wikis, setWikis, lastUpdate] = useSynchedWikisDict();
	if (wikis) {
		return wikis[id]
	}
	return undefined
}

function getDemoWiki(index: number){
	const demoResource: Wikis = {
		roles_required: [],
		children: [],
		translations: [],
		date_created: new Date().toISOString(),
		date_updated: new Date().toISOString(),
		id: (1000+index)+'',
		drawer_position: (index*2),
		sort: undefined,
		status: '',
		user_created: undefined,
		user_updated: undefined
	}
	return demoResource;
}

function getDemoWikis(): Record<string, Wikis> {
	const demoResources: Record<string, Wikis> = {}
	for(let i = 0; i < 10; i++){
		const demoResource = getDemoWiki(i)
		demoResources[demoResource.id] = demoResource
	}
	return demoResources
}